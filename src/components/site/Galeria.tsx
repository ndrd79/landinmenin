interface Foto {
    id: string
    url: string
    alt: string
}

interface GaleriaProps {
    fotos?: Foto[] | null
}

export default function Galeria({ fotos }: GaleriaProps) {
    const defaultFotos = [
        { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvkkAbQqO2ue5LAh5DPi67pAFNJw5UQ1PLnV9Bg3DvtbZUkE7_UJqjflbqrcT9f-1q-g1PrvSAByxODkuT_qtI_GnFrIwMmYyToMj7cZK4tof_vkSeEj8gMdK5Aoa1Jtn-hHH6wCUVR2EVijlCkbGyY4DwGbkAaNIgya1CYqx3-znhL7ZXDoX6bZb94pXtmCqk9ceZYAidM2eD5vOPHx0OrxMLvF9BrIDaRnpe5jYeP4MgSMlbLRy0IXe4dLbwvJ_V5xadLy9PKmp', alt: 'Piscina' },
        { id: '2', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTscK0Tq-A9B36f9Y9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9', alt: 'Área externa' },
        { id: '3', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTscK0Tq-A9B36f9Y9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9', alt: 'Quiosque' },
        { id: '4', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTscK0Tq-A9B36f9Y9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9', alt: 'Área de lazer' },
    ]

    const displayFotos = fotos && fotos.length > 0 ? fotos : defaultFotos

    return (
        <section className="bg-white px-6 py-20 lg:px-20" id="galeria">
            <div className="mx-auto max-w-[1280px]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-text-main md:text-4xl text-green-700">Nossa Estrutura em Fotos</h2>
                    <p className="text-text-muted mt-2">Conheça cada detalhe do nosso espaço</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {displayFotos.map((foto) => (
                        <div key={foto.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer">
                            <img
                                src={foto.url}
                                alt={foto.alt}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://wa.me/5518997473445?text=Olá! Gostaria de ver mais fotos da Estância Menin."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all"
                    >
                        Ver todas as fotos no Instagram
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
