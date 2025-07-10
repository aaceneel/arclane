import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/polymet/components/product-card";
import { ArrowDownIcon, ArrowUpIcon, GridIcon, ListIcon } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: {
    min: number;
    max: number;
  };
  currency: string;
  minOrder: number;
  rating: number;
  reviewCount: number;
  supplier: {
    name: string;
    country: string;
    verificationLevel: "verified" | "gold" | "platinum";
    responseRate: number;
  };
  featured?: boolean;
}

export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  showSortOptions?: boolean;
  showViewOptions?: boolean;
  emptyMessage?: string;
}

export default function ProductList({
  products,
  isLoading = false,
  showSortOptions = true,
  showViewOptions = true,
  emptyMessage = "No products found",
}: ProductListProps) {
  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortProducts = (products: Product[]) => {
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price.min - b.price.min);
      case "price-desc":
        return [...products].sort((a, b) => b.price.min - a.price.min);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...products]; // In a real app, would sort by date
      case "featured":
      default:
        return [...products].sort((a, b) => (a.featured ? -1 : 1));
    }
  };

  const sortedProducts = sortProducts(products);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[350px] animate-pulse rounded-lg bg-muted"
          ></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="mb-4 text-lg font-medium">{emptyMessage}</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(showSortOptions || showViewOptions) && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {showSortOptions && (
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {showViewOptions && (
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              slug={product.slug}
              image={product.image}
              price={product.price}
              currency={product.currency}
              minOrder={product.minOrder}
              rating={product.rating}
              reviewCount={product.reviewCount}
              supplier={product.supplier}
              featured={product.featured}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-lg border sm:flex-row"
            >
              <div className="aspect-square w-full sm:w-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2">
                  <h3 className="font-semibold hover:underline">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.supplier.name} • {product.supplier.country}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">
                      {product.price.min === product.price.max
                        ? `${product.currency} ${product.price.min}`
                        : `${product.currency} ${product.price.min} - ${product.price.max}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Min. Order: {product.minOrder} units
                    </div>
                  </div>
                  <Button>View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
