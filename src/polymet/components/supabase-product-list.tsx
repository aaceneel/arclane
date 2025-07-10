import { useProducts } from "@/hooks/useSupabase";
import ProductCard from "./product-card";

interface SupabaseProductListProps {
  title?: string;
  featured?: boolean;
  limit?: number;
  categoryId?: string;
}

export default function SupabaseProductList({
  title = "Products",
  featured,
  limit = 8,
  categoryId,
}: SupabaseProductListProps) {
  const { products, loading, error } = useProducts({
    featured,
    limit,
    categoryId,
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(limit)].map((_, i) => (
            <div
              key={i}
              className="h-[350px] animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  // Transform Supabase data to match ProductCard props
  const transformedProducts = products?.map((product) => ({
    id: product.id,
    title: product.title,
    slug: product.slug,
    image: product.images?.[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    price: {
      min: product.price_min,
      max: product.price_max,
    },
    currency: product.currency,
    minOrder: product.min_order,
    rating: product.rating,
    reviewCount: product.review_count,
    supplier: {
      name: product.suppliers?.name || 'Unknown Supplier',
      country: product.suppliers?.country || 'Unknown',
      verificationLevel: product.suppliers?.verification_level || 'verified',
      responseRate: product.suppliers?.response_rate || 0,
    },
    featured: product.featured,
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-sm text-muted-foreground">
          {products?.length || 0} products found
        </span>
      </div>
      
      {transformedProducts.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="mb-4 text-lg font-medium">No products found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {transformedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
} 