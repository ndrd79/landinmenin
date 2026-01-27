'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Pacote } from '@/types/database'

const coresBadge = [
    { value: 'gray', label: 'Cinza', class: 'bg-gray-100 text-gray-600' },
    { value: 'blue', label: 'Azul', class: 'bg-blue-100 text-blue-600' },
    { value: 'cyan', label: 'Ciano', class: 'bg-cyan-100 text-cyan-600' },
    { value: 'green', label: 'Verde', class: 'bg-green-100 text-green-600' },
]

const pacotesTemplate = [
    {
        nome: 'promocao_semana',
        titulo: 'Promoção Dia de Semana',
        descricao: 'Segunda a sexta com desconto',
        preco: 450,
        cor_badge: 'blue',
    },
    {
        nome: 'feriado',
        titulo: 'Pacote Feriado',
        descricao: 'Valor especial para feriados',
        preco: 750,
        cor_badge: 'cyan',
    },
    {
        nome: 'fim_ano',
        titulo: 'Pacote Fim de Ano',
        descricao: 'Natal e Ano Novo',
        preco: 900,
        cor_badge: 'green',
    },
]

export default function PacotesAdmin() {
    const [pacotes, setPacotes] = useState<Pacote[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editingPacote, setEditingPacote] = useState<Pacote | null>(null)
    const [formData, setFormData] = useState({
        nome: '',
        titulo: '',
        descricao: '',
        preco: '',
        itens: [''],
        cor_badge: 'gray',
        destaque: false,
    })

    const supabase = createClient()

    useEffect(() => {
        loadPacotes()
    }, [])

    const loadPacotes = async () => {
        const { data } = await supabase
            .from('pacotes')
            .select('*')
            .order('ordem', { ascending: true })

        if (data) {
            setPacotes(data)
        }
    }

    const handleEdit = (pacote: Pacote) => {
        setEditingPacote(pacote)
        setFormData({
            nome: pacote.nome,
            titulo: pacote.titulo,
            descricao: pacote.descricao,
            preco: pacote.preco.toString(),
            itens: pacote.itens.length > 0 ? pacote.itens : [''],
            cor_badge: pacote.cor_badge,
            destaque: pacote.destaque,
        })
        setModalOpen(true)
    }

    const handleNew = () => {
        setEditingPacote(null)
        setFormData({
            nome: '',
            titulo: '',
            descricao: '',
            preco: '',
            itens: [''],
            cor_badge: 'gray',
            destaque: false,
        })
        setModalOpen(true)
    }

    const handleTemplate = (template: typeof pacotesTemplate[0]) => {
        setEditingPacote(null)
        setFormData({
            nome: template.nome,
            titulo: template.titulo,
            descricao: template.descricao,
            preco: template.preco.toString(),
            itens: ['Área externa completa', 'Piscina'],
            cor_badge: template.cor_badge,
            destaque: false,
        })
        setModalOpen(true)
    }

    const handleSave = async () => {
        const data = {
            nome: formData.nome,
            titulo: formData.titulo,
            descricao: formData.descricao,
            preco: parseFloat(formData.preco),
            itens: formData.itens.filter(i => i.trim() !== ''),
            cor_badge: formData.cor_badge,
            destaque: formData.destaque,
            ativo: true,
            ordem: editingPacote?.ordem || pacotes.length,
        }

        if (editingPacote) {
            await supabase
                .from('pacotes')
                .update(data)
                .eq('id', editingPacote.id)
        } else {
            await supabase
                .from('pacotes')
                .insert(data)
        }

        await loadPacotes()
        setModalOpen(false)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este pacote?')) {
            await supabase.from('pacotes').delete().eq('id', id)
            await loadPacotes()
        }
    }

    const addItem = () => {
        setFormData({ ...formData, itens: [...formData.itens, ''] })
    }

    const removeItem = (index: number) => {
        const newItens = formData.itens.filter((_, i) => i !== index)
        setFormData({ ...formData, itens: newItens.length > 0 ? newItens : [''] })
    }

    const updateItem = (index: number, value: string) => {
        const newItens = [...formData.itens]
        newItens[index] = value
        setFormData({ ...formData, itens: newItens })
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pacotes</h1>
                    <p className="text-gray-500">Gerencie os pacotes de preços</p>
                </div>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Novo Pacote
                </button>
            </div>

            {/* Lista de pacotes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {pacotes.map(pacote => (
                    <div
                        key={pacote.id}
                        className={`bg-white rounded-xl p-6 border-2 ${pacote.destaque ? 'border-green-500 shadow-lg' : 'border-gray-100'} relative`}
                    >
                        {pacote.destaque && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                                MAIS POPULAR
                            </span>
                        )}
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 ${coresBadge.find(c => c.value === pacote.cor_badge)?.class}`}>
                            {pacote.nome.toUpperCase()}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{pacote.titulo}</h3>
                        <p className="text-sm text-gray-500 mb-3">{pacote.descricao}</p>
                        <p className="text-2xl font-bold text-green-600 mb-4">R$ {pacote.preco}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(pacote)}
                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(pacote.id)}
                                className="px-3 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Templates */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">📦 Pacotes Pré-Prontos (Templates)</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {pacotesTemplate.map(template => (
                        <button
                            key={template.nome}
                            onClick={() => handleTemplate(template)}
                            className="text-left p-4 border border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors"
                        >
                            <p className="font-bold text-gray-900">{template.titulo}</p>
                            <p className="text-sm text-gray-500">{template.descricao}</p>
                            <p className="text-green-600 font-bold mt-2">R$ {template.preco}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingPacote ? 'Editar Pacote' : 'Novo Pacote'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome (interno)</label>
                                    <input
                                        type="text"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="basico"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        type="text"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Sem Quarto"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <input
                                    type="text"
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Apenas área externa"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                                    <input
                                        type="number"
                                        value={formData.preco}
                                        onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="550"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Badge</label>
                                    <select
                                        value={formData.cor_badge}
                                        onChange={(e) => setFormData({ ...formData, cor_badge: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                        {coresBadge.map(cor => (
                                            <option key={cor.value} value={cor.value}>{cor.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Itens Inclusos</label>
                                {formData.itens.map((item, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => updateItem(index, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                            placeholder="Item incluso"
                                        />
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="px-3 bg-gray-100 rounded-lg hover:bg-red-100 text-gray-500 hover:text-red-500"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">remove</span>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addItem}
                                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                                >
                                    + Adicionar item
                                </button>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.destaque}
                                    onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                                    className="w-5 h-5 text-green-600 rounded"
                                />
                                <span className="font-medium text-gray-700">Marcar como "Mais Popular"</span>
                            </label>

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
