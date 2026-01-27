'use client'

import { useState, useEffect } from 'react'

interface Aviso {
    id: string
    titulo: string
    mensagem: string
    tipo: 'info' | 'promocao' | 'alerta' | 'evento'
    ativo: boolean
    data_inicio: string
    data_fim: string
}

interface BannerAvisosProps {
    avisos: Aviso[]
}

export default function ModalAvisos({ avisos }: BannerAvisosProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!avisos || avisos.length === 0) return

        const today = new Date().toISOString().split('T')[0]
        const activeItems = avisos.filter(a => a.ativo && a.data_inicio <= today && a.data_fim >= today)

        if (activeItems.length > 0) {
            // Check if this specific notice was already closed in this session
            const closedId = sessionStorage.getItem(`closed_notice_${activeItems[0].id}`)
            if (!closedId) {
                // Small delay for better UX
                const timer = setTimeout(() => setIsOpen(true), 1500)
                return () => clearTimeout(timer)
            }
        }
    }, [avisos])

    if (!isOpen || !avisos || avisos.length === 0) return null

    const today = new Date().toISOString().split('T')[0]
    const activeAvisos = avisos.filter(a => a.ativo && a.data_inicio <= today && a.data_fim >= today)
    if (activeAvisos.length === 0) return null

    const aviso = activeAvisos[0]

    const handleClose = () => {
        setIsOpen(false)
        sessionStorage.setItem(`closed_notice_${aviso.id}`, 'true')
    }

    const typeConfig = {
        info: {
            bg: 'bg-blue-50',
            accent: 'bg-blue-600',
            text: 'text-blue-900',
            icon: 'info',
            label: 'Informação'
        },
        promocao: {
            bg: 'bg-amber-50',
            accent: 'bg-accent',
            text: 'text-amber-900',
            icon: 'local_offer',
            label: 'Promoção'
        },
        alerta: {
            bg: 'bg-red-50',
            accent: 'bg-red-600',
            text: 'text-red-900',
            icon: 'warning',
            label: 'Aviso Importante'
        },
        evento: {
            bg: 'bg-emerald-50',
            accent: 'bg-primary',
            text: 'text-emerald-900',
            icon: 'celebration',
            label: 'Evento'
        }
    }

    const theme = typeConfig[aviso.tipo] || typeConfig.info

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-md overflow-hidden rounded-[2.5rem] ${theme.bg} shadow-2xl animate-float-slow`}>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/50 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/30 rounded-full blur-xl" />

                <div className="relative p-8 text-center">
                    {/* Icon Header */}
                    <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${theme.accent} text-white shadow-lg rotate-3`}>
                        <span className="material-symbols-outlined text-[40px]">
                            {theme.icon}
                        </span>
                    </div>

                    {/* Content */}
                    <span className={`block text-xs font-bold uppercase tracking-widest ${theme.text} opacity-60 mb-2`}>
                        {theme.label}
                    </span>
                    <h2 className={`text-2xl font-black mb-4 ${theme.text}`}>
                        {aviso.titulo}
                    </h2>
                    <p className={`text-lg leading-relaxed mb-8 opacity-80 ${theme.text}`}>
                        {aviso.mensagem}
                    </p>

                    {/* Action Button */}
                    <button
                        onClick={handleClose}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${theme.accent} hover:opacity-90`}
                    >
                        Entendi, fechar
                    </button>

                    {/* Small close button X */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 text-current opacity-40 hover:opacity-100 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
