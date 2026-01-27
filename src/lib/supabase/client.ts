import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        // Durante o build no Vercel, as variáveis podem estar ausentes. 
        // Se force-dynamic estiver ativo, isso não deve quebrar o build.
        // Se chegarmos aqui no runtime, aí sim é um erro crítico.
        if (typeof window === 'undefined') {
            return {} as any
        }
        throw new Error('Supabase URL e ANON KEY são obrigatórios. Configure o arquivo .env.local')
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}
