import { supabase } from "./auth"

export interface Project {
  id: string
  name: string
  user_id: string
}

export interface Citation {
  id: string
  project_id: string
  type: string
  details: any
  full: string
  short: {
    regular: string
    nameInSentence: string
    id: string
    idAt: string
  }
}

export async function createProject(name: string, userId: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.from("projects").insert({ name, user_id: userId }).select()
}

export async function getProjects(userId: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.from("projects").select("*").eq("user_id", userId)
}

export async function createCitation(citation: Omit<Citation, "id">) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.from("citations").insert(citation).select()
}

export async function getCitations(projectId: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.from("citations").select("*").eq("project_id", projectId)
}

export async function updateCitation(citation: Citation) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase client not initialized") }
  }
  return await supabase.from("citations").update(citation).eq("id", citation.id).select()
}

export async function deleteCitation(citationId: string) {
  if (!supabase) {
    return { error: new Error("Supabase client not initialized") }
  }
  return await supabase.from("citations").delete().eq("id", citationId)
}

