import type { LucideIcon } from 'lucide-react'
import {
  ChevronUp,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  QrCode,
  Settings,
  Store,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { ThemedSelect } from '@/components/ui/ThemedSelect'
import { useAuth } from '@/contexts/AuthContext'
import { useShopIssues } from '@/hooks/data/useInsights'
import { useMyShopDetail } from '@/hooks/data/useOwnerShops'
import { cn } from '@/utils/cn'

interface MenuItem {
  label: string
  icon: LucideIcon
  to?: string
  badge?: number
}

const ITEM_CLASS =
  'flex shrink-0 items-center gap-[11px] px-3 py-[11px] text-[11px] font-medium text-body transition-colors hover:bg-surface-subtle'

export function AppSidebar() {
  const navigate = useNavigate()
  const { displayUser, activeShop, activeShopId, shops, selectShop, isAuthenticated, logout } =
    useAuth()
  const { data: issuesPage } = useShopIssues(
    activeShopId,
    { page: 1, page_size: 50, sentiment: 'Negative' },
    isAuthenticated
  )
  const { data: shopDetail } = useMyShopDetail(activeShopId, isAuthenticated)

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  const negativeIssueCount = issuesPage
    ? issuesPage.data.filter((item) => item.stats.sentiment.negative > 0).length
    : 0
  const issueCount = isAuthenticated ? negativeIssueCount : 7
  const currentShop = shopDetail?.shop ?? activeShop

  useEffect(() => {
    if (!isProfileOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProfileOpen])

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Buat QR', icon: QrCode, to: '/create-qr' },
    {
      label: 'Grup Feedback & AI',
      icon: MessageSquare,
      to: '/feedback-group',
      badge: issueCount > 0 ? issueCount : undefined,
    },
  ]

  function handleLogout() {
    setIsProfileOpen(false)
    logout()
    toast.success('Berhasil keluar dari akun.')
    void navigate('/signin', { replace: true })
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 border-b border-border bg-surface p-4 lg:sticky lg:top-0 lg:h-dvh lg:w-[244px] lg:gap-0 lg:self-start lg:border-r lg:border-b-0">
      <BrandLogo to="/dashboard" size="sm" />

      {shops.length > 1 && (
        <div className="mt-3">
          <ThemedSelect
            icon={Store}
            label="Pilih toko aktif"
            value={activeShopId ?? ''}
            options={shops.map((entry) => ({
              value: entry.shop.id,
              label: entry.shop.name,
            }))}
            onChange={selectShop}
            size="sm"
            variant="field"
          />
        </div>
      )}

      <nav aria-label="Menu utama" className="lg:mt-6">
        <p className="mb-2.5 hidden px-2.5 text-[11px] font-medium text-muted-foreground lg:block">
          Menu utama
        </p>
        <div className="flex [scrollbar-width:none] gap-[3px] overflow-x-auto lg:flex-col lg:overflow-visible">
          {menuItems.map(({ label, icon: Icon, to, badge }) =>
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

      <div ref={profileMenuRef} className="relative mt-auto pt-3">
        {isProfileOpen && (
          <div
            role="menu"
            aria-label="Menu profil pengguna"
            className="absolute right-0 bottom-full left-0 z-40 mb-2 border border-border bg-surface p-1.5 shadow-card"
          >
            <div className="border-b border-border px-2.5 py-2">
              <p className="truncate text-[11px] font-semibold text-heading">{displayUser.name}</p>
              <p className="truncate pt-0.5 text-[10px] text-muted-foreground">
                {currentShop?.name ?? displayUser.role}
              </p>
            </div>

            <div className="pt-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsProfileOpen(false)
                  void navigate('/business-account')
                }}
                className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-[11px] font-medium text-body transition-colors hover:bg-surface-subtle hover:text-heading"
              >
                <Settings aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.7} />
                <span>Pengaturan Akun Bisnis</span>
              </button>

              <div className="my-1 h-px bg-border" />

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-[11px] font-semibold text-danger transition-colors hover:bg-danger/10"
              >
                <LogOut aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.7} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        )}

        <div className="border-t border-border pt-[15px]">
          <button
            type="button"
            aria-label={`Buka menu akun ${displayUser.name}`}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className={cn(
              'flex w-full items-center gap-[9px] px-1.5 py-1.5 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
              isProfileOpen && 'bg-surface-subtle'
            )}
          >
            <span className="flex size-[30px] shrink-0 items-center justify-center bg-primary text-[11px] font-semibold text-white">
              {displayUser.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] leading-[15px] font-semibold text-body">
                {displayUser.name}
              </span>
              <span className="block truncate pt-0.5 text-[11px] text-muted-foreground">
                {displayUser.role}
              </span>
            </span>
            <ChevronUp
              aria-hidden="true"
              className={cn(
                'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
                isProfileOpen && 'rotate-180 text-heading'
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  )
}
