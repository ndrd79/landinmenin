export default function Sobre() {
    return (
        <section className="bg-white px-6 py-16 lg:px-20" id="sobre">
            <div className="mx-auto max-w-[1280px]">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-3xl font-bold text-text-main md:text-4xl">Bem-vindo à Estância Menin</h2>
                            <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Há poucos minutos da cidade, oferecemos uma estrutura completa para quem busca relaxar ou celebrar momentos especiais. Nosso espaço é ideal para:
                        </p>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            <li className="flex items-center gap-3 bg-background-light p-4 rounded-xl border border-green-50">
                                <span className="material-symbols-outlined text-green-600">celebration</span>
                                <span className="font-semibold text-gray-700">Casamentos e Festas</span>
                            </li>
                            <li className="flex items-center gap-3 bg-background-light p-4 rounded-xl border border-green-50">
                                <span className="material-symbols-outlined text-green-600">church</span>
                                <span className="font-semibold text-gray-700">Encontros Religiosos</span>
                            </li>
                            <li className="flex items-center gap-3 bg-background-light p-4 rounded-xl border border-green-50">
                                <span className="material-symbols-outlined text-green-600">groups</span>
                                <span className="font-semibold text-gray-700">Confraternizações</span>
                            </li>
                            <li className="flex items-center gap-3 bg-background-light p-4 rounded-xl border border-green-50">
                                <span className="material-symbols-outlined text-green-600">stroller</span>
                                <span className="font-semibold text-gray-700">Chá Revelação</span>
                            </li>
                        </ul>
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
                            <h4 className="flex items-center gap-2 font-bold text-red-800 mb-2">
                                <span className="material-symbols-outlined">warning</span>
                                Regras Importantes
                            </h4>
                            <p className="text-sm text-red-700 font-medium">
                                NÃO PERMITIMOS: Festas com fins lucrativos (cobrança de entrada), venda de bebidas (revoadas) ou festas de jovens com som alto.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] rounded-2xl bg-gray-200 bg-cover bg-center shadow-lg transform translate-y-8" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTscK0Tq-A9B36f9Y9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9')" }}></div>
                        <div className="aspect-[3/4] rounded-2xl bg-gray-200 bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTscK0Tq-A9B36f9Y9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9q0x9')" }}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
