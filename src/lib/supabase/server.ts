import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Mock client that returns empty data instead of throwing errors
const createMockClient = () => {
    return {
        from: () => ({
            select: () => ({
                single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
                order: () => ({
                    ascending: () => Promise.resolve({ data: [], error: null })
                }),
                eq: () => Promise.resolve({ data: [], error: null }),
                then: (resolve: (value: { data: unknown[], error: null }) => void) => resolve({ data: [], error: null })
            }),
            insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        }),
        auth: {
            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
            signOut: () => Promise.resolve({ error: null }),
        }
    }
}

export async function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase environment variables not configured, using mock client')
        return createMockClient() as ReturnType<typeof createServerClient>
    }

    const cookieStore = await cookies()

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch {
                    // Ignorado em Server Components
                }
            },
        },
    })
}
