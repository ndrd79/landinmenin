'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { href: '/admin/calendario', label: 'Calendário', icon: 'calendar_month' },
    { href: '/admin/pacotes', label: 'Pacotes', icon: 'payments' },
    { href: '/admin/estrutura', label: 'Estrutura', icon: 'construction' },
    { href: '/admin/galeria', label: 'Galeria', icon: 'photo_library' },
    { href: '/admin/avisos', label: 'Avisos', icon: 'campaign' },
    { href: '/admin/configuracoes', label: 'Configurações', icon: 'settings' },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    // Fechar menu mobile ao trocar de rota
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

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
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row h-screen overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-[18px]">nature_people</span>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">Estância Menin</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </header>

            {/* Overlay Mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Section (Desktop) */}
                <div className="p-6 border-b border-gray-100 hidden lg:block">
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

                {/* Mobile Sidebar Close (only on mobile) */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
                    <span className="font-bold text-gray-900">Menu</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="material-symbols-outlined text-gray-400">close</span>
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 overflow-y-auto">
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
            <main className="flex-1 overflow-auto bg-gray-50">
                {children}
            </main>
        </div>
    )
}
