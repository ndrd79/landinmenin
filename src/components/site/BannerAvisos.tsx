'use client'

import { useState } from 'react'

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

export default function BannerAvisos({ avisos }: BannerAvisosProps) {
    const [isVisible, setIsVisible] = useState(true)

    if (!avisos || avisos.length === 0 || !isVisible) return null

    // Get the most recent active notice
    const today = new Date().toISOString().split('T')[0]
    const activeAvisos = avisos.filter(a => a.ativo && a.data_inicio <= today && a.data_fim >= today)

    if (activeAvisos.length === 0) return null

    const aviso = activeAvisos[0]

    const colors = {
        info: 'bg-blue-600',
        promocao: 'bg-accent',
        alerta: 'bg-red-600',
        evento: 'bg-primary'
    }

    const icons = {
        info: 'info',
        promocao: 'campaign',
        alerta: 'warning',
        evento: 'celebration'
    }

    return (
        <div className={`${colors[aviso.tipo] || colors.info} text-white relative z-[60] py-3 px-6 shadow-lg`}>
            <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[20px] hidden sm:block">
                    {icons[aviso.tipo] || icons.info}
                </span>
                <p className="text-sm md:text-base font-bold text-center leading-tight">
                    <span className="uppercase tracking-wider opacity-90 mr-2">{aviso.titulo}:</span>
                    {aviso.mensagem}
                </p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            </div>
        </div>
    )
}
