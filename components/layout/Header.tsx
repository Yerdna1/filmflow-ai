'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Bell, Search, User, LogOut, Settings, Crown, Menu, X, Film } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    plan?: string
  }
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="h-16 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Logo for mobile */}
        <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold">FilmFlow</span>
        </Link>

        {/* Search - hidden on mobile */}
        <div className="hidden sm:block flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Hľadať hercov, scény..."
            className="w-full pl-10 pr-4 py-2 bg-muted border border-transparent rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Plan badge */}
        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs">
          <Crown className="h-3 w-3 text-primary" />
          <span>{user.plan || 'FREE'}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative group">
          <button className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2">
              <a
                href="/dashboard/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
              >
                <Settings className="h-4 w-4" />
                Nastavenia
              </a>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Odhlásiť sa
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile menu overlay */}
    {mobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
        <nav
          className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border p-4 space-y-2 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <MobileNavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
          <MobileNavLink href="/dashboard/actors" onClick={() => setMobileMenuOpen(false)}>Herci</MobileNavLink>
          <MobileNavLink href="/dashboard/scenes" onClick={() => setMobileMenuOpen(false)}>Scény</MobileNavLink>
          <MobileNavLink href="/dashboard/storyboard" onClick={() => setMobileMenuOpen(false)}>Storyboardy</MobileNavLink>
          <MobileNavLink href="/dashboard/video" onClick={() => setMobileMenuOpen(false)}>Videá</MobileNavLink>
          <MobileNavLink href="/dashboard/audio/dialogue" onClick={() => setMobileMenuOpen(false)}>Dialógy</MobileNavLink>
          <MobileNavLink href="/dashboard/audio/music" onClick={() => setMobileMenuOpen(false)}>Hudba</MobileNavLink>

          <div className="border-t border-border pt-4 mt-4">
            <MobileNavLink href="/dashboard/settings" onClick={() => setMobileMenuOpen(false)}>Nastavenia</MobileNavLink>
            <MobileNavLink href="/dashboard/settings/subscription" onClick={() => setMobileMenuOpen(false)}>Predplatné</MobileNavLink>
          </div>
        </nav>
      </div>
    )}
    </>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
    >
      {children}
    </Link>
  )
}
