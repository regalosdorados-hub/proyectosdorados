import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// We use placeholders if the environment variables are missing to prevent the app from crashing on load.
// The app will still require these to be set correctly in the Supabase integration to function.
const url = supabaseUrl || 'https://placeholder-url.supabase.co'
const key = supabaseKey || 'placeholder-key'

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Please connect Supabase using the integration button.')
}

export const supabase = createClient(url, key)

export default supabase