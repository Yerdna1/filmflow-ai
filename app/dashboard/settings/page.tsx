import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { User, CreditCard, Bell, Shield, Key, HelpCircle } from 'lucide-react'

async function getUserSettings(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      plan: true,
      createdAt: true,
    },
  })
}

export default async function SettingsPage() {
  const session = await auth()
  const user = await getUserSettings(session!.user.id)

  const settingsLinks = [
    {
      icon: User,
      title: 'Profil',
      description: 'Upravte svoje osobné údaje',
      href: '/dashboard/settings/profile',
    },
    {
      icon: CreditCard,
      title: 'Predplatné',
      description: 'Spravujte váš plán a platby',
      href: '/dashboard/settings/subscription',
    },
    {
      icon: Key,
      title: 'API Kľúče',
      description: 'Spravujte vaše API kľúče',
      href: '/dashboard/settings/api-keys',
    },
    {
      icon: Bell,
      title: 'Notifikácie',
      description: 'Nastavte upozornenia',
      href: '/dashboard/settings/notifications',
    },
    {
      icon: Shield,
      title: 'Bezpečnosť',
      description: 'Heslo a overenie',
      href: '/dashboard/settings/security',
    },
    {
      icon: HelpCircle,
      title: 'Pomoc',
      description: 'FAQ a podpora',
      href: '/dashboard/help',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Nastavenia</h1>
        <p className="text-muted-foreground mt-1">
          Spravujte vaše konto a preferencie
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            {user?.image ? (
              <img src={user.image} alt={user.name || ''} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user?.name || 'Používateľ'}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <div className="text-right">
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              user?.plan === 'PRO'
                ? 'bg-accent-gold/10 text-accent-gold'
                : user?.plan === 'STUDIO'
                ? 'bg-purple-500/10 text-purple-500'
                : 'bg-muted text-muted-foreground'
            }`}>
              {user?.plan || 'FREE'} Plan
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              Člen od {new Date(user?.createdAt || Date.now()).toLocaleDateString('sk-SK')}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <item.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-red-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-500 mb-2">Nebezpečná zóna</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Po zmazaní účtu nie je možné obnoviť vaše dáta.
        </p>
        <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm">
          Zmazať účet
        </button>
      </div>
    </div>
  )
}
