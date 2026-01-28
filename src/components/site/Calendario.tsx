'use client'

import { useState } from 'react'

interface Agendamento {
    data: string
    status: 'disponivel' | 'reservado' | 'promocao' | 'indisponivel'
    preco_especial?: number
    observacao?: string
}

interface CalendarioProps {
    agendamentos?: Agendamento[]
}

export default function CalendarioSite({ agendamentos = [] }: CalendarioProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showModal, setShowModal] = useState<{ date: string, text: string } | null>(null)

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const days = []
    const totalDays = daysInMonth(year, month)
    const startDay = firstDayOfMonth(year, month)

    // Fill empty days at start
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-12 md:h-14" />)
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
                onClick={() => {
                    if (isPast) return;
                    if (status === 'promocao' && agendamento?.observacao) {
                        setShowModal({ date: dateStr, text: agendamento.observacao });
                    }
                }}
                className={`aspect-square flex flex-col items-center justify-center rounded-2xl text-sm font-semibold transition-all relative cursor-pointer border ${statusClass}`}
            >
                {day}
                {status === 'promocao' && (
                    <span className="text-[7px] absolute bottom-1 px-1 bg-accent/20 rounded uppercase font-bold text-accent">Promo</span>
                )}
            </div>
        )
    }

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-background-warm overflow-hidden" id="agenda">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent" />
            </div>

            <div className="mx-auto max-w-[1280px] relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Agenda</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-4">
                        Verifique a <span className="text-primary">disponibilidade</span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Consulte nosso calendário atualizado. Datas em dourado são promocionais!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Calendar Container */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-primary/10 relative">
                        {/* Status Modal - Small Alert inside calendar area */}
                        {showModal && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm rounded-3xl">
                                <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-accent max-w-xs text-center animate-float">
                                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-text-main mb-2">Informação da Data</h4>
                                    <p className="text-sm text-text-muted mb-4">{showModal.text}</p>
                                    <button
                                        onClick={() => setShowModal(null)}
                                        className="w-full bg-accent text-white py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                                    >
                                        Entendi
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 rounded-xl transition-colors">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h3 className="text-xl font-bold text-text-main">{monthNames[month]} {year}</h3>
                            <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 rounded-xl transition-colors">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 gap-2 text-center mb-4">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d, i) => (
                                <span key={i} className="text-xs font-bold text-text-muted uppercase">{d}</span>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {days}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-primary/10 justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                                <span className="text-[10px] font-medium text-text-muted">Livre</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-100"></div>
                                <span className="text-[10px] font-medium text-text-muted">Reservado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-accent/40"></div>
                                <span className="text-[10px] font-medium text-text-muted">Promoção</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Side */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full -ml-12 -mb-12 blur-xl" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">Gostou de alguma data?</h3>
                                <p className="text-white/90 mb-6 leading-relaxed">
                                    Clique no botão abaixo para falar conosco e garantir sua reserva.
                                </p>

                                {/* New Negotiation Note */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-accent text-[20px]">handshake</span>
                                    <p className="text-xs sm:text-sm font-medium">
                                        Para mais de uma diária, <span className="text-accent underline font-bold">negocie diretamente</span> com o proprietário!
                                    </p>
                                </div>

                                <a
                                    href="https://wa.me/5518997473445?text=Olá! Gostaria de consultar a disponibilidade de uma data."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all active:scale-95 shadow-lg group"
                                >
                                    <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Solicitar Reserva
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="group bg-white p-5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                    <h4 className="font-bold text-text-main group-hover:text-primary transition-colors">Check-in</h4>
                                </div>
                                <p className="text-sm text-text-muted">A partir das 09h</p>
                            </div>
                            <div className="group bg-white p-5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-secondary">
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
                                    <h4 className="font-bold text-text-main group-hover:text-secondary transition-colors">Check-out</h4>
                                </div>
                                <p className="text-sm text-text-muted">Até às 22h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
