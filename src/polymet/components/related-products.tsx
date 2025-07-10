import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/polymet/components/product-card";
import { ArrowRightIcon } from "lucide-react";

export interface RelatedProduct {
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

export interface RelatedProductsProps {
  title?: string;
  products: RelatedProduct[];
  viewAllLink?: string;
}

export default function RelatedProducts({
  title = "Related Products",
  products,
  viewAllLink,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Button variant="ghost" asChild>
            <Link to={viewAllLink}>
              View All
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: products.length > 4,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard
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
                variant="compact"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />

        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
