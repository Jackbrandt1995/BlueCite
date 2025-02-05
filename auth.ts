import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function signUp(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.auth.signUp({
    email,
    password,
  })
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  if (!supabase) {
    return { error: new Error("Supabase client not initialized") }
  }
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  if (!supabase) {
    return null
  }
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

