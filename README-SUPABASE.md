# Supabase Integration Guide

This project is configured to work with Supabase as the backend database. Follow these steps to connect your project to Supabase.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details and create the project

## 2. Get Your Project Credentials

After your project is created:

1. Go to Settings → API in your Supabase dashboard
2. Copy your "Project URL" and "anon public" key

## 3. Set Up Environment Variables

Create a `.env` file in your project root and add:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase credentials.

## 4. Set Up Database Schema

Run the following SQL in your Supabase SQL editor to create the required tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    image TEXT,
    product_count INTEGER DEFAULT 0,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Suppliers table
CREATE TABLE suppliers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    logo TEXT,
    country VARCHAR,
    response_rate INTEGER DEFAULT 0,
    response_time VARCHAR,
    year_established INTEGER,
    verification_level VARCHAR CHECK (verification_level IN ('verified', 'gold', 'platinum')) DEFAULT 'verified',
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    total_revenue VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    description TEXT,
    images TEXT[],
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2),
    currency VARCHAR DEFAULT 'USD',
    min_order INTEGER DEFAULT 1,
    category_id UUID REFERENCES categories(id),
    tags TEXT[],
    supplier_id UUID REFERENCES suppliers(id),
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    shipping_time VARCHAR,
    payment_methods TEXT[],
    customization_available BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    supplier_id UUID REFERENCES suppliers(id),
    total_amount DECIMAL(10,2),
    currency VARCHAR DEFAULT 'USD',
    status VARCHAR CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RFQs (Request for Quotations) table
CREATE TABLE rfqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    unit VARCHAR NOT NULL,
    specifications TEXT,
    target_price DECIMAL(10,2),
    currency VARCHAR DEFAULT 'USD',
    delivery_location VARCHAR,
    delivery_date VARCHAR,
    payment_terms VARCHAR,
    additional_requirements TEXT,
    contact_name VARCHAR NOT NULL,
    contact_email VARCHAR NOT NULL,
    contact_phone VARCHAR,
    company_name VARCHAR,
    status VARCHAR CHECK (status IN ('open', 'closed', 'expired')) DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, suppliers, and products
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Suppliers are viewable by everyone" ON suppliers FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Users can only see their own orders and RFQs
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can view own RFQs" ON rfqs FOR SELECT USING (auth.uid()::text = user_id);

-- Users can create their own orders and RFQs
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can create RFQs" ON rfqs FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own RFQs
CREATE POLICY "Users can update own RFQs" ON rfqs FOR UPDATE USING (auth.uid()::text = user_id);
```

## 5. Usage in Your Components

The project includes API wrapper functions in `src/lib/api.ts`. Here are some examples:

### Fetching Products

```typescript
import { productsApi } from '@/lib/api'

// Get all products
const products = await productsApi.getProducts()

// Get featured products
const featuredProducts = await productsApi.getProducts({ featured: true, limit: 10 })

// Get products by category
const categoryProducts = await productsApi.getProducts({ categoryId: 'category-id' })

// Get product by slug
const product = await productsApi.getProductBySlug('product-slug')
```

### Authentication

```typescript
import { authApi } from '@/lib/api'

// Sign up
const { user } = await authApi.signUp('email@example.com', 'password', {
  name: 'John Doe',
  company: 'Acme Corp'
})

// Sign in
const { user } = await authApi.signIn('email@example.com', 'password')

// Get current user
const user = await authApi.getCurrentUser()

// Sign out
await authApi.signOut()
```

### Creating RFQs

```typescript
import { rfqsApi } from '@/lib/api'

const rfq = await rfqsApi.createRFQ({
  user_id: user.id,
  product_name: 'Custom Electronics',
  category: 'Electronics',
  quantity: 100,
  unit: 'pieces',
  specifications: 'Custom specifications...',
  // ... other fields
})
```

## 6. Update Your Components

Replace the mock data calls in your components with the Supabase API calls. For example, in `product-detail-page.tsx`:

```typescript
// Replace this:
setTimeout(() => {
  const foundProduct = PRODUCTS.find((p) => p.slug === slug);
  setProduct(foundProduct || null);
}, 500);

// With this:
useEffect(() => {
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const product = await productsApi.getProductBySlug(slug);
      setProduct(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProduct();
}, [slug]);
```

## 7. Authentication State Management

Consider adding a context provider for authentication state management across your app. Create `src/contexts/AuthContext.tsx`:

```typescript
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, authApi } from '@/lib/api'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    authApi.getCurrentUser().then(setUser).finally(() => setLoading(false))

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { user } = await authApi.signIn(email, password)
    setUser(user)
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    const { user } = await authApi.signUp(email, password, metadata)
    setUser(user)
  }

  const signOut = async () => {
    await authApi.signOut()
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

## Next Steps

1. Set up your Supabase project and get your credentials
2. Add the environment variables to your `.env` file
3. Run the SQL schema in your Supabase SQL editor
4. Update your components to use the Supabase API instead of mock data
5. Test the integration and add error handling as needed

Your marketplace app is now ready to use Supabase as the backend! 