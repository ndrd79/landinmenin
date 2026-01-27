'use client'

import { useState, useEffect } from 'react'

interface Agendamento {
    data: string
    status: 'disponivel' | 'reservado' | 'promocao' | 'indisponivel'
    preco_especial?: number
}

interface CalendarioProps {
    agendamentos?: Agendamento[]
}

export default function CalendarioSite({ agendamentos = [] }: CalendarioProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<string | null>(null)

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const days = []
    const totalDays = daysInMonth(year, month)
    const startDay = firstDayOfMonth(year, month)

    // Fill empty days at start
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-12 md:h-16" />)
    }

    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        const agendamento = agendamentos.find(a => a.data === dateStr)
        const status = agendamento?.status || 'disponivel'

        // Disable past days
        const isPast = new Date(dateStr) < new Date(new Date().setHours(0, 0, 0, 0))

        let statusClass = 'day-available'
        if (isPast) statusClass = 'day-past'
        else if (status === 'reservado' || status === 'indisponivel') statusClass = 'day-reserved'
        else if (status === 'promocao') statusClass = 'day-promotion'

        days.push(
            <div
                key={day}
                onClick={() => !isPast && status === 'disponivel' && setSelectedDate(dateStr)}
                className={`h-12 md:h-16 flex flex-col items-center justify-center rounded-xl border text-sm font-bold transition-all relative group ${statusClass} ${selectedDate === dateStr ? 'day-selected' : ''}`}
            >
                {day}
                {agendamento?.preco_especial && status === 'promocao' && (
                    <span className="text-[10px] absolute bottom-1 text-orange-600">R${agendamento.preco_especial}</span>
                )}
            </div>
        )
    }

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    return (
        <section className="bg-white px-6 py-20 lg:px-20" id="agenda">
            <div className="mx-auto max-w-[1280px]">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-text-main md:text-4xl mb-6">Disponibilidade</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Consulte nosso calendário atualizado em tempo real. Datas em <span className="text-red-500 font-bold">vermelho</span> já estão reservadas. Datas em <span className="text-yellow-600 font-bold">amarelo</span> possuem preço promocional!
                        </p>

                        <div className="bg-background-light p-6 md:p-8 rounded-3xl border border-green-100">
                            <div className="flex items-center justify-between mb-8">
                                <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 hover:bg-white rounded-full transition-colors">
                                    <span className="material-symbols-outlined text-green-600">chevron_left</span>
                                </button>
                                <h3 className="text-lg font-bold text-gray-800">{monthNames[month]} {year}</h3>
                                <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 hover:bg-white rounded-full transition-colors">
                                    <span className="material-symbols-outlined text-green-600">chevron_right</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center mb-4">
                                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                                    <span key={d} className="text-xs font-bold text-gray-400">{d}</span>
                                ))}
                                {days}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-green-50 justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div>
                                    <span className="text-xs font-medium text-gray-500">Livre</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
                                    <span className="text-xs font-medium text-gray-500">Reservado</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-200"></div>
                                    <span className="text-xs font-medium text-gray-500">Promoção</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:pt-20">
                        <div className="bg-green-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-green-200 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-[120px]">event_available</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Gostou de alguma data?</h3>
                            <p className="mb-8 opacity-90 text-lg">
                                Clique no botão abaixo para falar conosco agora e garantir sua reserva. As datas costumam esgotar rápido!
                            </p>
                            <a
                                href="https://wa.me/5518997473445?text=Olá! Gostaria de consultar a disponibilidade de uma data."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
                            >
                                <span className="material-symbols-outlined">chat</span>
                                Solicitar Reserva via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
