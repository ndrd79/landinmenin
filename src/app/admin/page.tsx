'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminDashboard() {
    const [userEmail, setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUserEmail(user?.email || null)
        })
    }, [])

    const stats = {
        reservasHoje: 0,
        reservasMes: 0,
        avisosAtivos: 0,
        totalPacotes: 4,
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Bem-vindo(a) de volta{userEmail ? `, ${userEmail}` : ''}</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-600">event_available</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.reservasHoje}</p>
                            <p className="text-sm text-gray-500">Reservas Hoje</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600">calendar_month</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.reservasMes}</p>
                            <p className="text-sm text-gray-500">Reservas no Mês</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-yellow-600">campaign</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.avisosAtivos}</p>
                            <p className="text-sm text-gray-500">Avisos Ativos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-600">payments</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalPacotes}</p>
                            <p className="text-sm text-gray-500">Pacotes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/calendario"
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                    >
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-green-600">add_circle</span>
                        <span className="font-medium text-gray-700 group-hover:text-green-700">Marcar Nova Reserva</span>
                    </a>
                    <a
                        href="/admin/avisos"
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                    >
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-green-600">add_alert</span>
                        <span className="font-medium text-gray-700 group-hover:text-green-700">Criar Novo Aviso</span>
                    </a>
                    <a
                        href="/admin/pacotes"
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                    >
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-green-600">edit</span>
                        <span className="font-medium text-gray-700 group-hover:text-green-700">Editar Pacotes</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
