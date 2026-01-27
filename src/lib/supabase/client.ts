import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL e ANON KEY são obrigatórios. Configure o arquivo .env.local')
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}
