import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { ToastProvider } from '@/components/ui/toast'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <ToastProvider>
      <div className="min-h-screen flex">
        {/* Sidebar - hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <Header user={session.user} />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
