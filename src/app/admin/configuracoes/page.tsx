'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Configuracoes } from '@/types/database'

export default function ConfiguracoesAdmin() {
    const [config, setConfig] = useState<Partial<Configuracoes>>({
        whatsapp: '',
        telefone: '',
        horario_checkin: '09:00',
        horario_checkout: '22:00',
        capacidade: 50,
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const supabase = createClient()

    useEffect(() => {
        loadConfig()
    }, [])

    const loadConfig = async () => {
        const { data } = await supabase
            .from('configuracoes')
            .select('*')
            .single()

        if (data) {
            setConfig(data)
        }
        setLoading(false)
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage(null)

        const { error } = await supabase
            .from('configuracoes')
            .upsert({
                id: 1,
                ...config,
                updated_at: new Date().toISOString(),
            })

        if (error) {
            setMessage({ type: 'error', text: 'Erro ao salvar configurações' })
        } else {
            setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' })
        }

        setSaving(false)
        setTimeout(() => setMessage(null), 3000)
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                <p className="text-gray-500">Configurações gerais do site</p>
            </div>

            {/* Mensagem */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <div className="max-w-2xl space-y-6">
                {/* Contato */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600">call</span>
                        Contato
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                            <div className="flex">
                                <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-2 rounded-l-lg text-gray-500">+55</span>
                                <input
                                    type="text"
                                    value={config.whatsapp || ''}
                                    onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg"
                                    placeholder="51999999999"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Apenas números, sem espaços ou traços</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <input
                                type="text"
                                value={config.telefone || ''}
                                onChange={(e) => setConfig({ ...config, telefone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="(51) 99999-9999"
                            />
                        </div>
                    </div>
                </div>

                {/* Horários */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600">schedule</span>
                        Horários
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                            <input
                                type="time"
                                value={config.horario_checkin || ''}
                                onChange={(e) => setConfig({ ...config, horario_checkin: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                            <input
                                type="time"
                                value={config.horario_checkout || ''}
                                onChange={(e) => setConfig({ ...config, horario_checkout: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Capacidade */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600">groups</span>
                        Capacidade
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade Máxima (pessoas)</label>
                        <input
                            type="number"
                            value={config.capacidade || ''}
                            onChange={(e) => setConfig({ ...config, capacidade: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            min="1"
                        />
                    </div>
                </div>

                {/* Botão Salvar */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    {saving ? 'Salvando...' : 'Salvar Configurações'}
                </button>
            </div>
        </div>
    )
}
