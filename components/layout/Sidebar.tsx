'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Film,
  LayoutDashboard,
  Users,
  Layers,
  Image,
  Video,
  Mic,
  Music,
  Settings,
  CreditCard,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Demo Presety', href: '/dashboard/presets', icon: Sparkles },
  { name: 'Herci', href: '/dashboard/actors', icon: Users },
  { name: 'Scény', href: '/dashboard/scenes', icon: Layers },
  { name: 'Storyboardy', href: '/dashboard/storyboard', icon: Image },
  { name: 'Videá', href: '/dashboard/video', icon: Video },
  { name: 'Dialógy', href: '/dashboard/audio/dialogue', icon: Mic },
  { name: 'Hudba', href: '/dashboard/audio/music', icon: Music },
]

const secondaryNavigation = [
  { name: 'Nastavenia', href: '/dashboard/settings', icon: Settings },
  { name: 'Predplatné', href: '/dashboard/settings/subscription', icon: CreditCard },
  { name: 'Pomoc', href: '/dashboard/help', icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">FilmFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="p-4 border-t border-border space-y-1">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* Plan Badge */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Váš plán</p>
          <p className="font-semibold">Free Tier</p>
          <Link
            href="/dashboard/settings/subscription"
            className="text-xs text-primary hover:underline mt-2 inline-block"
          >
            Upgradovať
          </Link>
        </div>
      </div>
    </aside>
  )
}
