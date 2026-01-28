'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Galeria as GaleriaType } from '@/types/database'

interface GaleriaProps {
    fotos?: GaleriaType[] | null
}

export default function Galeria({ fotos }: GaleriaProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const defaultFotos = [
        { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvkkAbQqO2ue5LAh5DPi67pAFNJw5UQ1PLnV9Bg3DvtbZUkE7_UJqjflbqrcT9f-1q-g1PrvSAByxODkuT_qtI_GnFrIwMmYyToMj7cZK4tof_vkSeEj8gMdK5Aoa1Jtn-hHH6wCUVR2EVijlCkbGyY4DwGbkAaNIgya1CYqx3-znhL7ZXDoX6bZb94pXtmCqk9ceZYAidM2eD5vOPHx0OrxMLvF9BrIDaRnpe5jYeP4MgSMlbLRy0IXe4dLbwvJ_V5xadLy9PKmp', alt: 'Piscina' },
        { id: '2', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvR8TjfjpLN2F9zfuMHzVJO1D5bCU5dg6xJFG2_6FwmLJzqGKDJYzY0-vTHxfaFd4RV1_4lAOGvqME0K5VkYz5LquW2vHVbKqE_Ql', alt: 'Área externa' },
        { id: '3', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvkkAbQqO2ue5LAh5DPi67pAFNJw5UQ1PLnV9Bg3DvtbZUkE7_UJqjflbqrcT9f-1q-g1PrvSAByxODkuT_qtI_GnFrIwMmYyToMj7cZK4tof_vkSeEj8gMdK5Aoa1Jtn-hHH6wCUVR2EVijlCkbGyY4DwGbkAaNIgya1CYqx3-znhL7ZXDoX6bZb94pXtmCqk9ceZYAidM2eD5vOPHx0OrxMLvF9BrIDaRnpe5jYeP4MgSMlbLRy0IXe4dLbwvJ_V5xadLy9PKmp', alt: 'Quiosque' },
        { id: '4', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvR8TjfjpLN2F9zfuMHzVJO1D5bCU5dg6xJFG2_6FwmLJzqGKDJYzY0-vTHxfaFd4RV1_4lAOGvqME0K5VkYz5LquW2vHVbKqE_Ql', alt: 'Área de lazer' },
        { id: '5', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvkkAbQqO2ue5LAh5DPi67pAFNJw5UQ1PLnV9Bg3DvtbZUkE7_UJqjflbqrcT9f-1q-g1PrvSAByxODkuT_qtI_GnFrIwMmYyToMj7cZK4tof_vkSeEj8gMdK5Aoa1Jtn-hHH6wCUVR2EVijlCkbGyY4DwGbkAaNIgya1CYqx3-znhL7ZXDoX6bZb94pXtmCqk9ceZYAidM2eD5vOPHx0OrxMLvF9BrIDaRnpe5jYeP4MgSMlbLRy0IXe4dLbwvJ_V5xadLy9PKmp', alt: 'Churrasqueira' },
        { id: '6', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvR8TjfjpLN2F9zfuMHzVJO1D5bCU5dg6xJFG2_6FwmLJzqGKDJYzY0-vTHxfaFd4RV1_4lAOGvqME0K5VkYz5LquW2vHVbKqE_Ql', alt: 'Vista geral' },
    ]

    const activeFotos = fotos?.filter(f => f.ativo) || []
    const displayFotos = activeFotos.length > 0 ? activeFotos : defaultFotos

    if (displayFotos.length === 0) return null

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-background-warm overflow-hidden" id="galeria">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent" />
            </div>

            <div className="mx-auto max-w-[1280px] relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Galeria</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-4">
                        Nossa estrutura em{' '}
                        <span className="text-primary">fotos</span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Conheça cada detalhe do nosso espaço e imagine-se aqui
                    </p>
                </div>

                {/* Photo Grid - Refined Masonry */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {displayFotos.map((foto) => (
                        <div
                            key={foto.id}
                            onClick={() => setSelectedImage(foto.url)}
                            className="relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <Image
                                src={foto.url}
                                alt={foto.alt || 'Foto da Estância Menin'}
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Refined Overlay - Minimalist */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 backdrop-blur-[2px]">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-300 border border-white/30">
                                    <span className="material-symbols-outlined text-white text-[28px]">zoom_in</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <a
                        href="https://www.instagram.com/estancia_menin?igshid=MWRjMHRwcjB4MnoxaA%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300 cursor-pointer"
                    >
                        <span>Ver mais fotos no Instagram</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-text-main/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={selectedImage}
                        alt="Imagem ampliada"
                        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    )
}
