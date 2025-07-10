import { useState, useEffect } from 'react'
import { productsApi, suppliersApi, categoriesApi, ordersApi, rfqsApi } from '@/lib/api'

// Hook for fetching products
export function useProducts(filters?: Parameters<typeof productsApi.getProducts>[0]) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productsApi.getProducts(filters)
        setProducts(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [JSON.stringify(filters)]) // Re-run when filters change

  return { products, loading, error, refetch: () => setLoading(true) }
}

// Hook for fetching a single product
export function useProduct(slug: string) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productsApi.getProductBySlug(slug)
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Product not found')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  return { product, loading, error }
}

// Hook for fetching suppliers
export function useSuppliers(limit?: number) {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await suppliersApi.getSuppliers(limit)
        setSuppliers(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setSuppliers([])
      } finally {
        setLoading(false)
      }
    }

    fetchSuppliers()
  }, [limit])

  return { suppliers, loading, error }
}

// Hook for fetching categories
export function useCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await categoriesApi.getCategories()
        setCategories(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Hook for fetching user orders
export function useUserOrders(userId?: string) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setOrders([])
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await ordersApi.getUserOrders(userId)
        setOrders(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  return { orders, loading, error, refetch: () => setLoading(true) }
}

// Hook for fetching user RFQs
export function useUserRFQs(userId?: string) {
  const [rfqs, setRfqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setRfqs([])
      setLoading(false)
      return
    }

    const fetchRfqs = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await rfqsApi.getUserRFQs(userId)
        setRfqs(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setRfqs([])
      } finally {
        setLoading(false)
      }
    }

    fetchRfqs()
  }, [userId])

  return { rfqs, loading, error, refetch: () => setLoading(true) }
}

// Hook for creating mutations (create, update, delete operations)
export function useSupabaseMutation<T extends any[], R>(
  mutationFn: (...args: T) => Promise<R>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (...args: T): Promise<R | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await mutationFn(...args)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
} 