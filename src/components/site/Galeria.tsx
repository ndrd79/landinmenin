'use client'

import { useState } from 'react'

interface Foto {
    id: string
    url: string
    alt: string
}

interface GaleriaProps {
    fotos?: Foto[] | null
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

    const displayFotos = fotos && fotos.length > 0 ? fotos : defaultFotos

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

                {/* Photo Grid - Masonry Style */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {displayFotos.map((foto, index) => (
                        <div
                            key={foto.id}
                            onClick={() => setSelectedImage(foto.url)}
                            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                }`}
                        >
                            <div className={`w-full ${index === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square'}`}>
                                <img
                                    src={foto.url}
                                    alt={foto.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-text-main/60 via-text-main/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 md:p-6">
                                <span className="text-white font-medium">{foto.alt}</span>
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <a
                        href="https://wa.me/5518997473445?text=Olá! Gostaria de ver mais fotos da Estância Menin."
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
