'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Galeria } from '@/types/database'

const secoes = [
    { value: 'hero', label: 'Hero (Banner Principal)' },
    { value: 'sobre', label: 'Sobre Nós' },
    { value: 'galeria', label: 'Galeria' },
]

export default function GaleriaAdmin() {
    const [fotos, setFotos] = useState<Galeria[]>([])
    const [secaoAtiva, setSecaoAtiva] = useState<'hero' | 'galeria' | 'estrutura' | 'sobre'>('galeria')
    const [uploading, setUploading] = useState(false)
    const [editingFoto, setEditingFoto] = useState<Galeria | null>(null)

    const supabase = createClient()

    useEffect(() => {
        loadFotos()
    }, [])

    const loadFotos = async () => {
        try {
            console.log('Carregando fotos...')
            const { data, error } = await supabase
                .from('galeria')
                .select('*')
                .order('ordem', { ascending: true })

            if (error) {
                console.error('Erro ao buscar fotos:', error)
                alert(`Erro ao carregar fotos: ${error.message}`)
                return
            }

            console.log('Fotos carregadas:', data?.length)
            if (data) {
                setFotos(data)
            }
        } catch (err) {
            console.error('Erro inesperado no loadFotos:', err)
        }
    }

    const fotosSecao = fotos.filter(f => f.secao === secaoAtiva)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        console.log('Arquivos selecionados:', files.length)

        const maxFotos = (secaoAtiva === 'hero' || secaoAtiva === 'sobre') ? 1 : 8

        if (fotosSecao.length >= maxFotos) {
            alert(`Limite de ${maxFotos} foto(s) para esta seção atingido! Remova a foto atual para enviar uma nova.`)
            return
        }

        if (files.length > maxFotos - fotosSecao.length) {
            alert(`Você só pode enviar mais ${maxFotos - fotosSecao.length} foto(s) para esta seção.`)
            return
        }

        alert(`Iniciando o envio de ${files.length} foto(s). Por favor, aguarde...`)
        setUploading(true)
        let successCount = 0
        let failCount = 0

        for (const file of Array.from(files)) {
            try {
                if (file.size > 5 * 1024 * 1024) {
                    alert(`Arquivo ${file.name} é maior que 5MB e foi ignorado.`)
                    failCount++
                    continue
                }

                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
                const filePath = `${secaoAtiva}/${fileName}`

                // Upload para Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from('galeria')
                    .upload(filePath, file)

                if (uploadError) {
                    console.error('Erro no upload para o storage:', uploadError)
                    alert(`Erro ao subir ${file.name}: ${uploadError.message}. Verifique se a pasta 'galeria' foi criada no Supabase Storage.`)
                    failCount++
                    continue
                }

                // Pegar URL pública
                const { data: { publicUrl } } = supabase.storage
                    .from('galeria')
                    .getPublicUrl(filePath)

                // Salvar no banco
                const { error: dbError } = await supabase.from('galeria').insert({
                    url: publicUrl,
                    alt: file.name.replace(/\.[^/.]+$/, ''),
                    secao: secaoAtiva,
                    ordem: fotosSecao.length + successCount,
                    ativo: true,
                })

                if (dbError) {
                    console.error('Erro ao salvar no banco:', dbError)
                    alert(`Arquivo subiu mas não salvou no banco: ${dbError.message}`)
                    failCount++
                } else {
                    successCount++
                }
            } catch (err) {
                console.error('Erro inesperado:', err)
                failCount++
            }
        }

        if (successCount > 0) {
            await loadFotos()
        }

        if (failCount === 0) {
            alert('Todas as fotos foram enviadas com sucesso!')
        } else if (successCount > 0) {
            alert(`${successCount} fotos enviadas, mas ${failCount} falharam.`)
        }

        setUploading(false)
        e.target.value = ''
    }

    const handleDelete = async (foto: Galeria) => {
        if (!confirm('Tem certeza que deseja excluir esta foto?')) return

        // Extrair path do storage da URL
        const urlParts = foto.url.split('/galeria/')
        if (urlParts.length > 1) {
            const storagePath = urlParts[1]
            await supabase.storage.from('galeria').remove([storagePath])
        }

        await supabase.from('galeria').delete().eq('id', foto.id)
        await loadFotos()
    }

    const handleUpdateAlt = async () => {
        if (!editingFoto) return

        await supabase
            .from('galeria')
            .update({ alt: editingFoto.alt })
            .eq('id', editingFoto.id)

        await loadFotos()
        setEditingFoto(null)
    }

    return (
        <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Galeria</h1>
                    <p className="text-gray-500 text-sm">Gerencie as fotos do site</p>
                </div>
                <label className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm cursor-pointer w-full sm:w-auto">
                    <span className="material-symbols-outlined text-[20px]">upload</span>
                    <span className="font-bold">{uploading ? 'Enviando...' : 'Upload'}</span>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>

            {/* Tabs de seção */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {secoes.map(secao => (
                    <button
                        key={secao.value}
                        onClick={() => setSecaoAtiva(secao.value as typeof secaoAtiva)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${secaoAtiva === secao.value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {secao.label}
                    </button>
                ))}
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">info</span>
                <span className="text-sm text-blue-800">
                    <strong>{fotosSecao.length}/{(secaoAtiva === 'hero' || secaoAtiva === 'sobre') ? 1 : 8}</strong> fotos na seção. Máximo 5MB por imagem.
                </span>
            </div>

            {/* Grid de fotos */}
            {fotosSecao.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {fotosSecao.map(foto => (
                        <div key={foto.id} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                                <img
                                    src={foto.url}
                                    alt={foto.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setEditingFoto(foto)}
                                    className="p-2 bg-white rounded-lg hover:bg-gray-100"
                                    title="Editar"
                                >
                                    <span className="material-symbols-outlined text-gray-700">edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(foto)}
                                    className="p-2 bg-white rounded-lg hover:bg-red-50"
                                    title="Excluir"
                                >
                                    <span className="material-symbols-outlined text-red-600">delete</span>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 truncate">{foto.alt}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <span className="material-symbols-outlined text-gray-300 text-[48px]">image</span>
                    <p className="text-gray-500 mt-2">Nenhuma foto nesta seção</p>
                    <p className="text-sm text-gray-400">Clique em "Upload" para adicionar</p>
                </div>
            )}

            {/* Modal de edição */}
            {editingFoto && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Editar Foto</h3>
                            <button onClick={() => setEditingFoto(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <img
                                src={editingFoto.url}
                                alt={editingFoto.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto Alternativo</label>
                            <input
                                type="text"
                                value={editingFoto.alt}
                                onChange={(e) => setEditingFoto({ ...editingFoto, alt: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Descrição da imagem"
                            />
                        </div>

                        <button
                            onClick={handleUpdateAlt}
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
