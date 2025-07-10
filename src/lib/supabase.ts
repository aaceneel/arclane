import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a fallback client if environment variables are not set (for development)
let supabase: any

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. Using fallback mode. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file for full functionality.'
  )
  
  // Create a mock supabase client for development without errors
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
      signUp: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null })
          })
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
          })
        })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ error: new Error('Supabase not configured') })
      })
    })
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// Database types (you can generate these from your Supabase schema)
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          images: string[]
          price_min: number
          price_max: number
          currency: string
          min_order: number
          category_id: string
          tags: string[]
          supplier_id: string
          rating: number
          review_count: number
          shipping_time: string
          payment_methods: string[]
          customization_available: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          images: string[]
          price_min: number
          price_max: number
          currency: string
          min_order: number
          category_id: string
          tags: string[]
          supplier_id: string
          rating?: number
          review_count?: number
          shipping_time: string
          payment_methods: string[]
          customization_available?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          images?: string[]
          price_min?: number
          price_max?: number
          currency?: string
          min_order?: number
          category_id?: string
          tags?: string[]
          supplier_id?: string
          rating?: number
          review_count?: number
          shipping_time?: string
          payment_methods?: string[]
          customization_available?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          name: string
          logo: string
          country: string
          response_rate: number
          response_time: string
          year_established: number
          verification_level: 'verified' | 'gold' | 'platinum'
          rating: number
          review_count: number
          total_revenue: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo: string
          country: string
          response_rate: number
          response_time: string
          year_established: number
          verification_level: 'verified' | 'gold' | 'platinum'
          rating?: number
          review_count?: number
          total_revenue: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          country?: string
          response_rate?: number
          response_time?: string
          year_established?: number
          verification_level?: 'verified' | 'gold' | 'platinum'
          rating?: number
          review_count?: number
          total_revenue?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string
          image: string
          product_count: number
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image: string
          product_count?: number
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image?: string
          product_count?: number
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          supplier_id: string
          total_amount: number
          currency: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          supplier_id: string
          total_amount: number
          currency: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          supplier_id?: string
          total_amount?: number
          currency?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      rfqs: {
        Row: {
          id: string
          user_id: string
          product_name: string
          category: string
          quantity: number
          unit: string
          specifications: string
          target_price: number | null
          currency: string
          delivery_location: string
          delivery_date: string
          payment_terms: string
          additional_requirements: string
          contact_name: string
          contact_email: string
          contact_phone: string
          company_name: string
          status: 'open' | 'closed' | 'expired'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_name: string
          category: string
          quantity: number
          unit: string
          specifications: string
          target_price?: number | null
          currency: string
          delivery_location: string
          delivery_date: string
          payment_terms: string
          additional_requirements: string
          contact_name: string
          contact_email: string
          contact_phone: string
          company_name: string
          status?: 'open' | 'closed' | 'expired'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_name?: string
          category?: string
          quantity?: number
          unit?: string
          specifications?: string
          target_price?: number | null
          currency?: string
          delivery_location?: string
          delivery_date?: string
          payment_terms?: string
          additional_requirements?: string
          contact_name?: string
          contact_email?: string
          contact_phone?: string
          company_name?: string
          status?: 'open' | 'closed' | 'expired'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 