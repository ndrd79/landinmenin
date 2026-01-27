'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { href: '/admin/calendario', label: 'Calendário', icon: 'calendar_month' },
    { href: '/admin/pacotes', label: 'Pacotes', icon: 'payments' },
    { href: '/admin/galeria', label: 'Galeria', icon: 'photo_library' },
    { href: '/admin/avisos', label: 'Avisos', icon: 'campaign' },
    { href: '/admin/configuracoes', label: 'Configurações', icon: 'settings' },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    // Não renderizar sidebar na página de login
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-600">nature_people</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">Estância Menin</h1>
                            <p className="text-xs text-gray-500">Painel Admin</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-green-50 text-green-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Footer do Sidebar */}
                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        Ver site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-700 transition-colors mt-1"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Sair
                    </button>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}
