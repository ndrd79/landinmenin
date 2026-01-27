// Tipos do banco de dados Supabase

export interface Configuracoes {
    id: number
    whatsapp: string
    telefone: string
    horario_checkin: string
    horario_checkout: string
    capacidade: number
    created_at: string
    updated_at: string
}

export interface Pacote {
    id: string
    nome: string
    titulo: string
    descricao: string
    preco: number
    itens: string[]
    destaque: boolean
    cor_badge: 'gray' | 'blue' | 'cyan' | 'green'
    ativo: boolean
    ordem: number
    created_at: string
}

export type StatusCalendario = 'disponivel' | 'reservado' | 'promocao' | 'indisponivel'

export interface Calendario {
    id: string
    data: string
    status: StatusCalendario
    preco_especial: number | null
    observacao: string | null
    cliente_nome: string | null
    created_at: string
}

export interface Galeria {
    id: string
    url: string
    alt: string
    ordem: number
    secao: 'hero' | 'galeria' | 'estrutura'
    ativo: boolean
    created_at: string
}

export type TipoAviso = 'info' | 'promocao' | 'alerta' | 'evento'

export interface Aviso {
    id: string
    titulo: string
    mensagem: string
    tipo: TipoAviso
    data_inicio: string
    data_fim: string
    ativo: boolean
    created_at: string
}

export interface ItemEstrutura {
    id: string
    nome: string
    icone: string
    ativo: boolean
    ordem: number
}

// Tipos para formulários
export type PacoteForm = Omit<Pacote, 'id' | 'created_at'>
export type CalendarioForm = Omit<Calendario, 'id' | 'created_at'>
export type GaleriaForm = Omit<Galeria, 'id' | 'created_at'>
export type AvisoForm = Omit<Aviso, 'id' | 'created_at'>
