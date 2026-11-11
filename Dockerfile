# syntax=docker/dockerfile:1

# One Dockerfile for both modes: compose.dev.yaml builds the "dev" target, compose.prod.yaml the "prod" target

# Dependencies, shared by every stage below
FROM node:24-alpine AS deps
WORKDIR /app
# Git hooks only make sense in a git checkout, not inside an image
ENV HUSKY=0
COPY package.json package-lock.json ./
RUN npm ci

# Development: Vite dev server with hot reload
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173", "--strictPort"]

# Build: type check + static files in /app/dist
FROM deps AS build
# VITE_ variables are read at build time and end up in the public bundle, never pass secrets
ARG VITE_APP_NAME
ARG VITE_BACKEND_URL
COPY . .
RUN npm run build

# Production: nginx with the static files only, no Node and no source code
FROM nginx:stable-alpine AS prod
ARG VITE_BACKEND_URL
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
# The CSP allows requests to the origin of the backend, the same URL that was built into the bundle
RUN BACKEND_ORIGIN="$(echo "$VITE_BACKEND_URL" | sed -nE 's#^(https?://[^/]+).*#\1#p')" \
  && sed -i "s#__BACKEND_ORIGIN__#${BACKEND_ORIGIN}#" /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
