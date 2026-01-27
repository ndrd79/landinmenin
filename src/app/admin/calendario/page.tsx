'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Calendario, StatusCalendario } from '@/types/database'

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const statusColors: Record<StatusCalendario, string> = {
    disponivel: 'bg-green-100 text-green-800 border-green-300',
    reservado: 'bg-red-100 text-red-800 border-red-300',
    promocao: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    indisponivel: 'bg-gray-200 text-gray-600 border-gray-300',
}

export default function CalendarioAdmin() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [eventos, setEventos] = useState<Calendario[]>([])
    const [formData, setFormData] = useState({
        status: 'disponivel' as StatusCalendario,
        preco_especial: '',
        cliente_nome: '',
        observacao: '',
    })

    const supabase = createClient()

    // Carregar eventos do mês
    useEffect(() => {
        loadEventos()
    }, [currentDate])

    const loadEventos = async () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

        const { data } = await supabase
            .from('calendario')
            .select('*')
            .gte('data', startOfMonth.toISOString().split('T')[0])
            .lte('data', endOfMonth.toISOString().split('T')[0])

        if (data) {
            setEventos(data)
        }
    }

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        const days = []

        // Dias vazios antes do primeiro dia do mês
        for (let i = 0; i < firstDay; i++) {
            days.push(null)
        }

        // Dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i)
        }

        return days
    }

    const getEventoForDay = (day: number | null) => {
        if (!day) return null
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return eventos.find(e => e.data === dateStr)
    }

    const handleDayClick = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        setSelectedDate(dateStr)

        const evento = getEventoForDay(day)
        if (evento) {
            setFormData({
                status: evento.status,
                preco_especial: evento.preco_especial?.toString() || '',
                cliente_nome: evento.cliente_nome || '',
                observacao: evento.observacao || '',
            })
        } else {
            setFormData({
                status: 'disponivel',
                preco_especial: '',
                cliente_nome: '',
                observacao: '',
            })
        }

        setModalOpen(true)
    }

    const handleSave = async () => {
        if (!selectedDate) return

        const existingEvento = eventos.find(e => e.data === selectedDate)

        const data = {
            data: selectedDate,
            status: formData.status,
            preco_especial: formData.preco_especial ? parseFloat(formData.preco_especial) : null,
            cliente_nome: formData.cliente_nome || null,
            observacao: formData.observacao || null,
        }

        if (existingEvento) {
            await supabase
                .from('calendario')
                .update(data)
                .eq('id', existingEvento.id)
        } else {
            await supabase
                .from('calendario')
                .insert(data)
        }

        await loadEventos()
        setModalOpen(false)
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calendário</h1>
                    <p className="text-gray-500">Gerencie reservas e disponibilidade</p>
                </div>
            </div>

            {/* Calendário */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                {/* Navegação do mês */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">
                        {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                {/* Dias da semana */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {diasSemana.map(dia => (
                        <div key={dia} className="text-center text-sm font-bold text-gray-500 py-2">
                            {dia}
                        </div>
                    ))}
                </div>

                {/* Dias do mês */}
                <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth().map((day, index) => {
                        const evento = getEventoForDay(day)
                        return (
                            <div key={index} className="aspect-square">
                                {day && (
                                    <button
                                        onClick={() => handleDayClick(day)}
                                        className={`w-full h-full rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-105 ${evento ? statusColors[evento.status] : 'bg-white border-gray-200 hover:border-green-300'
                                            }`}
                                    >
                                        <span className="text-lg font-bold">{day}</span>
                                        {evento?.preco_especial && (
                                            <span className="text-[10px] font-medium">R${evento.preco_especial}</span>
                                        )}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Legenda */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></span>
                        <span className="text-sm text-gray-600">Disponível</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-red-100 border-2 border-red-300"></span>
                        <span className="text-sm text-gray-600">Reservado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-300"></span>
                        <span className="text-sm text-gray-600">Promoção</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200 border-2 border-gray-300"></span>
                        <span className="text-sm text-gray-600">Indisponível</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                {selectedDate && new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['disponivel', 'reservado', 'promocao', 'indisponivel'] as StatusCalendario[]).map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setFormData({ ...formData, status })}
                                            className={`p-3 rounded-lg border-2 text-sm font-medium capitalize ${formData.status === status ? statusColors[status] : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            {status === 'disponivel' && '✅ '}
                                            {status === 'reservado' && '🔴 '}
                                            {status === 'promocao' && '🔥 '}
                                            {status === 'indisponivel' && '⛔ '}
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preço especial */}
                            {(formData.status === 'promocao' || formData.status === 'reservado') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço Especial (R$)</label>
                                    <input
                                        type="number"
                                        value={formData.preco_especial}
                                        onChange={(e) => setFormData({ ...formData, preco_especial: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Ex: 450"
                                    />
                                </div>
                            )}

                            {/* Nome do cliente */}
                            {formData.status === 'reservado' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
                                    <input
                                        type="text"
                                        value={formData.cliente_nome}
                                        onChange={(e) => setFormData({ ...formData, cliente_nome: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Ex: João Silva"
                                    />
                                </div>
                            )}

                            {/* Observação */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Observação (opcional)</label>
                                <textarea
                                    value={formData.observacao}
                                    onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    rows={2}
                                    placeholder="Anotações internas..."
                                />
                            </div>

                            {/* Botão Salvar */}
                            <button
                                onClick={handleSave}
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
