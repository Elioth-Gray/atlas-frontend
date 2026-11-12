import type { LucideIcon } from 'lucide-react'
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  QrCode,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { CURRENT_USER } from '@/constants'
import { cn } from '@/utils/cn'

interface MenuItem {
  label: string
  icon: LucideIcon
  to?: string
  badge?: number
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Buat QR', icon: QrCode, to: '/buat-qr' },
  { label: 'Grup Feedback & AI', icon: MessageSquare, to: '/grup-feedback', badge: 7 },
  { label: 'Akun Bisnis', icon: BriefcaseBusiness, to: '/akun-bisnis' },
]

const ITEM_CLASS =
  'flex shrink-0 items-center gap-[11px] px-3 py-[11px] text-[11px] font-medium text-body transition-colors hover:bg-surface-subtle'

export function AppSidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    void navigate('/login', { replace: true })
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 border-b border-border bg-surface p-4 lg:h-svh lg:w-[244px] lg:gap-0 lg:border-r lg:border-b-0">
      <BrandLogo to="/dashboard" size="sm" />

      <nav aria-label="Menu utama" className="lg:mt-6">
        <p className="mb-2.5 hidden px-2.5 text-[11px] font-medium text-muted-foreground lg:block">
          Menu utama
        </p>
        <div className="flex [scrollbar-width:none] gap-[3px] overflow-x-auto lg:flex-col lg:overflow-visible">
          {MENU_ITEMS.map(({ label, icon: Icon, to, badge }) =>
            to ? (
              <NavLink
                key={label}
                to={to}
                end
                className={({ isActive }) =>
                  cn(
                    ITEM_CLASS,
                    isActive &&
                      'relative bg-primary font-bold text-primary-foreground hover:bg-primary'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1/2 -left-3 h-5 w-[3px] -translate-y-1/2 bg-secondary" />
                    )}
                    <Icon aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={1.6} />
                    <span>{label}</span>
                    {badge !== undefined && (
                      <span className="ml-auto bg-secondary px-[6px] py-[2px] text-[11px] leading-none font-medium text-white">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ) : (
              <button
                key={label}
                type="button"
                disabled
                title="Segera hadir"
                className={cn(ITEM_CLASS, 'cursor-not-allowed')}
              >
                <Icon aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={1.6} />
                <span>{label}</span>
                {badge !== undefined && (
                  <span className="ml-auto bg-secondary px-[6px] py-[2px] text-[11px] leading-none font-medium text-white">
                    {badge}
                  </span>
                )}
              </button>
            )
          )}
        </div>
      </nav>

      <div className="mt-auto pt-3">
        <div className="border-t border-border pt-[15px]">
          <button
            type="button"
            aria-label="Buka menu akun Khaei Raveen"
            className="flex w-full items-center gap-[9px] px-1 py-1 text-left transition-colors hover:bg-surface-subtle"
          >
            <span className="flex size-[30px] shrink-0 items-center justify-center bg-primary text-[11px] text-white">
              {CURRENT_USER.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] leading-[15px] font-semibold text-body">
                {CURRENT_USER.name}
              </span>
              <span className="block truncate pt-0.5 text-[11px] text-muted-foreground">
                {CURRENT_USER.role}
              </span>
            </span>
            <MoreHorizontal aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-[9px] px-1 py-2 text-left text-[11px] font-medium text-body transition-colors hover:bg-surface-subtle hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <LogOut aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={1.6} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
