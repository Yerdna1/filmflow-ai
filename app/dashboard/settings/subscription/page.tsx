import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Check, ArrowLeft } from 'lucide-react'

async function getUserPlan(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })
}

const plans = [
  {
    id: 'FREE',
    name: 'Free',
    price: '0',
    period: 'navždy',
    description: 'Ideálne na vyskúšanie',
    features: [
      '5 AI generácií denne',
      '720p rozlíšenie',
      '2 hercov',
      '5 scén',
      'Základná podpora',
    ],
    highlighted: false,
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: '29',
    period: '/mesiac',
    description: 'Pre profesionálov',
    features: [
      '100 AI generácií denne',
      '4K rozlíšenie',
      'Neobmedzený počet hercov',
      'Neobmedzený počet scén',
      'Prioritná podpora',
      'Bez vodoznaku',
      'API prístup',
    ],
    highlighted: true,
  },
  {
    id: 'STUDIO',
    name: 'Studio',
    price: '99',
    period: '/mesiac',
    description: 'Pre produkčné štúdiá',
    features: [
      'Neobmedzené generácie',
      '8K rozlíšenie',
      'Tímová spolupráca',
      'Vlastné modely',
      'Dedikovaná podpora 24/7',
      'SLA garantované',
      'On-premise možnosť',
    ],
    highlighted: false,
  },
]

export default async function SubscriptionPage() {
  const session = await auth()
  const user = await getUserPlan(session!.user.id)
  const currentPlan = user?.plan || 'FREE'

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/settings"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Predplatné</h1>
          <p className="text-muted-foreground mt-1">
            Vyberte si plán ktorý vyhovuje vašim potrebám
          </p>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Váš aktuálny plán</p>
            <p className="text-2xl font-bold">{currentPlan}</p>
          </div>
          {currentPlan !== 'FREE' && (
            <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Zrušiť predplatné
            </button>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-card border rounded-xl p-6 ${
              plan.highlighted
                ? 'border-primary shadow-lg shadow-primary/10'
                : 'border-border'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Najpopulárnejší
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}€</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={currentPlan === plan.id}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                currentPlan === plan.id
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : plan.highlighted
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {currentPlan === plan.id
                ? 'Aktuálny plán'
                : currentPlan === 'STUDIO' && plan.id !== 'STUDIO'
                ? 'Downgrade'
                : 'Vybrať plán'}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Často kladené otázky</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Môžem kedykoľvek zrušiť?</h4>
            <p className="text-sm text-muted-foreground">
              Áno, môžete zrušiť predplatné kedykoľvek. Budete mať prístup do konca fakturačného obdobia.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Aké platobné metódy akceptujete?</h4>
            <p className="text-sm text-muted-foreground">
              Akceptujeme Visa, Mastercard a bankový prevod.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Čo sa stane s mojimi generáciami ak zruším?</h4>
            <p className="text-sm text-muted-foreground">
              Vaše generácie zostanú dostupné aj po zrušení predplatného.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
