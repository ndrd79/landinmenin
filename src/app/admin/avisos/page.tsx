'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Aviso, TipoAviso } from '@/types/database'

const tiposAviso = [
    { value: 'info', label: 'ℹ️ Info', class: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'promocao', label: '🔥 Promoção', class: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'alerta', label: '⚠️ Alerta', class: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'evento', label: '🎉 Evento', class: 'bg-green-100 text-green-800 border-green-200' },
]

export default function AvisosAdmin() {
    const [avisos, setAvisos] = useState<Aviso[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editingAviso, setEditingAviso] = useState<Aviso | null>(null)
    const [formData, setFormData] = useState({
        titulo: '',
        mensagem: '',
        tipo: 'info' as TipoAviso,
        data_inicio: '',
        data_fim: '',
    })

    const supabase = createClient()

    useEffect(() => {
        loadAvisos()
    }, [])

    const loadAvisos = async () => {
        const { data } = await supabase
            .from('avisos')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setAvisos(data)
        }
    }

    const handleEdit = (aviso: Aviso) => {
        setEditingAviso(aviso)
        setFormData({
            titulo: aviso.titulo,
            mensagem: aviso.mensagem,
            tipo: aviso.tipo,
            data_inicio: aviso.data_inicio,
            data_fim: aviso.data_fim,
        })
        setModalOpen(true)
    }

    const handleNew = () => {
        setEditingAviso(null)
        const today = new Date().toISOString().split('T')[0]
        const nextMonth = new Date()
        nextMonth.setMonth(nextMonth.getMonth() + 1)

        setFormData({
            titulo: '',
            mensagem: '',
            tipo: 'info',
            data_inicio: today,
            data_fim: nextMonth.toISOString().split('T')[0],
        })
        setModalOpen(true)
    }

    const handleSave = async () => {
        const data = {
            titulo: formData.titulo,
            mensagem: formData.mensagem,
            tipo: formData.tipo,
            data_inicio: formData.data_inicio,
            data_fim: formData.data_fim,
            ativo: true,
        }

        if (editingAviso) {
            await supabase
                .from('avisos')
                .update(data)
                .eq('id', editingAviso.id)
        } else {
            await supabase
                .from('avisos')
                .insert(data)
        }

        await loadAvisos()
        setModalOpen(false)
    }

    const toggleAtivo = async (aviso: Aviso) => {
        await supabase
            .from('avisos')
            .update({ ativo: !aviso.ativo })
            .eq('id', aviso.id)

        await loadAvisos()
    }

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este aviso?')) {
            await supabase.from('avisos').delete().eq('id', id)
            await loadAvisos()
        }
    }

    const isAvisoAtivo = (aviso: Aviso) => {
        if (!aviso.ativo) return false
        const today = new Date().toISOString().split('T')[0]
        return aviso.data_inicio <= today && aviso.data_fim >= today
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Avisos</h1>
                    <p className="text-gray-500">Crie banners e avisos para o site</p>
                </div>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Novo Aviso
                </button>
            </div>

            {/* Lista de avisos */}
            <div className="space-y-4">
                {avisos.length > 0 ? (
                    avisos.map(aviso => {
                        const tipoInfo = tiposAviso.find(t => t.value === aviso.tipo)
                        const ativo = isAvisoAtivo(aviso)

                        return (
                            <div
                                key={aviso.id}
                                className={`bg-white rounded-xl border p-6 ${ativo ? 'border-green-200' : 'border-gray-100 opacity-60'}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${tipoInfo?.class}`}>
                                                {tipoInfo?.label}
                                            </span>
                                            {ativo ? (
                                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                    Ativo agora
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">Inativo</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">{aviso.titulo}</h3>
                                        <p className="text-gray-600">{aviso.mensagem}</p>
                                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                                {new Date(aviso.data_inicio).toLocaleDateString('pt-BR')}
                                            </span>
                                            <span>até</span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">event</span>
                                                {new Date(aviso.data_fim).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleAtivo(aviso)}
                                            className={`p-2 rounded-lg ${aviso.ativo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                                            title={aviso.ativo ? 'Desativar' : 'Ativar'}
                                        >
                                            <span className="material-symbols-outlined">
                                                {aviso.ativo ? 'visibility' : 'visibility_off'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleEdit(aviso)}
                                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                                            title="Editar"
                                        >
                                            <span className="material-symbols-outlined text-gray-600">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(aviso.id)}
                                            className="p-2 bg-gray-100 rounded-lg hover:bg-red-50"
                                            title="Excluir"
                                        >
                                            <span className="material-symbols-outlined text-red-600">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <span className="material-symbols-outlined text-gray-300 text-[48px]">campaign</span>
                        <p className="text-gray-500 mt-2">Nenhum aviso criado</p>
                        <p className="text-sm text-gray-400">Clique em "Novo Aviso" para criar</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingAviso ? 'Editar Aviso' : 'Novo Aviso'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {tiposAviso.map(tipo => (
                                        <button
                                            key={tipo.value}
                                            onClick={() => setFormData({ ...formData, tipo: tipo.value as TipoAviso })}
                                            className={`p-3 rounded-lg border-2 text-sm font-medium ${formData.tipo === tipo.value ? tipo.class + ' border-current' : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            {tipo.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Ex: Promoção de Janeiro"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                                <textarea
                                    value={formData.mensagem}
                                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    rows={3}
                                    placeholder="Ex: 20% OFF em reservas de segunda a quinta!"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
                                    <input
                                        type="date"
                                        value={formData.data_inicio}
                                        onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
                                    <input
                                        type="date"
                                        value={formData.data_fim}
                                        onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

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
