'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ItemEstrutura } from '@/types/database'

const sugestoesIcones = [
    { name: 'pool', label: 'Piscina' },
    { name: 'outdoor_grill', label: 'Churrasqueira' },
    { name: 'deck', label: 'Quiosque/Deck' },
    { name: 'local_parking', label: 'Estacionamento' },
    { name: 'wifi', label: 'Wi-Fi' },
    { name: 'park', label: 'Área Verde' },
    { name: 'event_seat', label: 'Cadeiras' },
    { name: 'table_restaurant', label: 'Mesas' },
    { name: 'wc', label: 'Banheiro' },
    { name: 'kitchen', label: 'Cozinha/Geladeira' },
    { name: 'tv', label: 'TV' },
    { name: 'speaker', label: 'Som' },
    { name: 'celebration', label: 'Festa' },
    { name: 'local_fire_department', label: 'Fogão/Gás' },
    { name: 'sports_gymnastics', label: 'Cama Elástica' },
    { name: 'yard', label: 'Jardim' },
]

export default function EstruturaAdmin() {
    const [itens, setItens] = useState<ItemEstrutura[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<ItemEstrutura | null>(null)
    const [formData, setFormData] = useState({
        nome: '',
        icone: 'park',
        descricao: '',
        ativo: true,
        ordem: 0
    })

    const supabase = createClient()

    useEffect(() => {
        loadItens()
    }, [])

    const loadItens = async () => {
        const { data } = await supabase
            .from('itens_estrutura')
            .select('*')
            .order('ordem', { ascending: true })

        if (data) {
            setItens(data)
        }
    }

    const handleEdit = (item: ItemEstrutura) => {
        setEditingItem(item)
        setFormData({
            nome: item.nome,
            icone: item.icone,
            descricao: item.descricao || '',
            ativo: item.ativo,
            ordem: item.ordem
        })
        setModalOpen(true)
    }

    const handleNew = () => {
        setEditingItem(null)
        setFormData({
            nome: '',
            icone: 'park',
            descricao: '',
            ativo: true,
            ordem: itens.length
        })
        setModalOpen(true)
    }

    const handleSave = async () => {
        if (!formData.nome.trim()) {
            alert('Por favor, insira um nome para o item.')
            return
        }

        const data = {
            nome: formData.nome,
            icone: formData.icone,
            descricao: formData.descricao,
            ativo: formData.ativo,
            ordem: formData.ordem
        }

        if (editingItem) {
            await supabase
                .from('itens_estrutura')
                .update(data)
                .eq('id', editingItem.id)
        } else {
            await supabase
                .from('itens_estrutura')
                .insert(data)
        }

        await loadItens()
        setModalOpen(false)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este item da estrutura?')) {
            await supabase.from('itens_estrutura').delete().eq('id', id)
            await loadItens()
        }
    }

    const toggleAtivo = async (item: ItemEstrutura) => {
        await supabase
            .from('itens_estrutura')
            .update({ ativo: !item.ativo })
            .eq('id', item.id)

        await loadItens()
    }

    return (
        <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Estrutura</h1>
                    <p className="text-gray-500 text-sm">Gerencie os itens que aparecem na seção "Nossa Estrutura"</p>
                </div>
                <button
                    onClick={handleNew}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Novo Item
                </button>
            </div>

            {/* Grid de Itens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {itens.map((item) => (
                    <div
                        key={item.id}
                        className={`bg-white rounded-xl border p-4 transition-all ${!item.ativo ? 'opacity-50 grayscale' : 'border-gray-100 shadow-sm'}`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                                <span className="material-symbols-outlined text-[24px]">
                                    {item.icone || 'park'}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => toggleAtivo(item)}
                                    className={`p-1.5 rounded-md transition-colors ${item.ativo ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                    title={item.ativo ? 'Desativar' : 'Ativar'}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {item.ativo ? 'visibility' : 'visibility_off'}
                                    </span>
                                </button>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                    title="Editar"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    title="Excluir"
                                >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.nome}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.descricao || '(Sem descrição)'}</p>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Ordem: {item.ordem}</span>
                            {!item.ativo && <span className="text-[10px] font-bold text-red-500 uppercase">Inativo</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingItem ? 'Editar Item' : 'Novo Item da Estrutura'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Item</label>
                                <input
                                    type="text"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="Ex: Piscina, Wi-Fi..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Descrição Curta</label>
                                <textarea
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="Ex: Piscina de 8x4 metros com cascata"
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Ordem de Exibição</label>
                                    <input
                                        type="number"
                                        value={formData.ordem}
                                        onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.ativo}
                                            onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                                            className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Item Ativo</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Selecione um Ícone</label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {sugestoesIcones.map((icon) => (
                                        <button
                                            key={icon.name}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, icone: icon.name })}
                                            className={`
                                                flex flex-col items-center p-2 rounded-lg border transition-all text-center
                                                ${formData.icone === icon.name ? 'border-green-600 bg-green-50 text-green-700 ring-1 ring-green-600' : 'border-gray-200 hover:border-green-300 text-gray-500'}
                                            `}
                                        >
                                            <span className="material-symbols-outlined text-[20px] mb-1">{icon.name}</span>
                                            <span className="text-[9px] font-medium leading-tight">{icon.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-[11px] font-medium text-gray-400 mb-1">Ou digite o nome do ícone Google:</label>
                                    <input
                                        type="text"
                                        value={formData.icone}
                                        onChange={(e) => setFormData({ ...formData, icone: e.target.value })}
                                        className="w-full px-4 py-1.5 text-xs border border-gray-200 rounded-md"
                                        placeholder="nome_do_icone"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={handleSave}
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95"
                            >
                                {editingItem ? 'Salvar Alterações' : 'Criar Item'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
