import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type JobPosition = {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary_range: string | null
  description: string
  requirements: string[]
  is_active: boolean
  created_at: string
}

export type JobApplication = {
  position_id: string | null
  position_title: string
  first_name: string
  last_name: string
  email: string
  phone: string
  experience_years: number
  applicant_role: string
  linkedin_url: string
  portfolio_url: string
  cover_letter: string
  how_did_you_hear: string
}
