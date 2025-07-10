import { supabase, Database } from './supabase'

// Types
type Product = Database['public']['Tables']['products']['Row']
type Supplier = Database['public']['Tables']['suppliers']['Row']
type Category = Database['public']['Tables']['categories']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type RFQ = Database['public']['Tables']['rfqs']['Row']

// Products API
export const productsApi = {
  // Get all products with optional filters
  async getProducts(filters?: {
    categoryId?: string
    supplierId?: string
    featured?: boolean
    limit?: number
    offset?: number
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        suppliers (*)
      `)

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId)
    }
    
    if (filters?.supplierId) {
      query = query.eq('supplier_id', filters.supplierId)
    }
    
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get product by slug
  async getProductBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        suppliers (*)
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  // Get product by ID
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        suppliers (*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Search products
  async searchProducts(query: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        suppliers (*)
      `)
      .textSearch('title', query)
    
    if (error) throw error
    return data
  },

  // Create product (admin/supplier only)
  async createProduct(product: Database['public']['Tables']['products']['Insert']) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update product
  async updateProduct(id: string, updates: Database['public']['Tables']['products']['Update']) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete product
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Suppliers API
export const suppliersApi = {
  // Get all suppliers
  async getSuppliers(limit?: number) {
    let query = supabase
      .from('suppliers')
      .select('*')
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  // Get supplier by ID
  async getSupplierById(id: string) {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create supplier
  async createSupplier(supplier: Database['public']['Tables']['suppliers']['Insert']) {
    const { data, error } = await supabase
      .from('suppliers')
      .insert(supplier)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update supplier
  async updateSupplier(id: string, updates: Database['public']['Tables']['suppliers']['Update']) {
    const { data, error } = await supabase
      .from('suppliers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Categories API
export const categoriesApi = {
  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  // Get category by ID
  async getCategoryById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get subcategories
  async getSubcategories(parentId: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .order('name')
    
    if (error) throw error
    return data
  }
}

// Orders API
export const ordersApi = {
  // Get user orders
  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        suppliers (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get order by ID
  async getOrderById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        suppliers (*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create order
  async createOrder(order: Database['public']['Tables']['orders']['Insert']) {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update order status
  async updateOrderStatus(id: string, status: Database['public']['Tables']['orders']['Row']['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// RFQs API
export const rfqsApi = {
  // Get user RFQs
  async getUserRFQs(userId: string) {
    const { data, error } = await supabase
      .from('rfqs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get RFQ by ID
  async getRFQById(id: string) {
    const { data, error } = await supabase
      .from('rfqs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create RFQ
  async createRFQ(rfq: Database['public']['Tables']['rfqs']['Insert']) {
    const { data, error } = await supabase
      .from('rfqs')
      .insert(rfq)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update RFQ
  async updateRFQ(id: string, updates: Database['public']['Tables']['rfqs']['Update']) {
    const { data, error } = await supabase
      .from('rfqs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get all open RFQs (for suppliers)
  async getOpenRFQs(limit?: number) {
    let query = supabase
      .from('rfqs')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  }
}

// Authentication helper functions
export const authApi = {
  // Sign up
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return data
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }
} 