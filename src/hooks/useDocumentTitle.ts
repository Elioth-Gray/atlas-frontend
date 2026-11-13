import { useEffect } from 'react'

/** Keeps the browser tab title synchronized with the active page. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
