import { createClient } from '@supabase/supabase-js'

// SupabaseプロジェクトのURLと公開キー(.envで管理)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
