"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/polymet/components/breadcrumb";
import ProductDetailGallery from "@/polymet/components/product-detail-gallery";
import ProductInquiryForm from "@/polymet/components/product-inquiry-form";
import ProductSpecifications from "@/polymet/components/product-specifications";
import ProductVariantsSelector from "@/polymet/components/product-variants-selector";
import RelatedProducts from "@/polymet/components/related-products";
import SupplierInfoCard from "@/polymet/components/supplier-info-card";
import { PRODUCTS, Product } from "@/polymet/data/product-data";
import {
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  GlobeIcon,
  ShieldIcon,
  TruckIcon,
} from "lucide-react";

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate API call to fetch product details
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = PRODUCTS.find((p) => p.slug === slug);
      setProduct(foundProduct || null);

      // Find related products (same category or supplier)
      if (foundProduct) {
        const related = PRODUCTS.filter(
          (p) =>
            p.id !== foundProduct.id &&
            (p.categoryId === foundProduct.categoryId ||
              p.supplier.id === foundProduct.supplier.id)
        ).slice(0, 8);
        setRelatedProducts(related);
      }

      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-2/3 rounded-md bg-muted"></div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square rounded-lg bg-muted"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded-md bg-muted"></div>
              <div className="h-6 w-1/2 rounded-md bg-muted"></div>
              <div className="h-24 rounded-md bg-muted"></div>
              <div className="h-40 rounded-md bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  // Find the category path for breadcrumb
  const categoryPath = [
    { label: "Categories", href: "/categories" },
    { label: "Industrial Supplies", href: "/category/industrial-supplies" },
    { label: "Safety Equipment", href: "/category/safety-equipment" },
    { label: product.title },
  ];

  return (
    <div className="container py-8">
      <Breadcrumb items={categoryPath} />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <ProductDetailGallery
          images={product.images}
          productName={product.title}
        />

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {product.featured && <Badge variant="default">Featured</Badge>}
              <Badge variant="outline">
                {product.categoryId.replace(/-/g, " ")}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center">
              <TruckIcon className="mr-2 h-4 w-4 text-muted-foreground" />

              <span>Ships in {product.shippingTime}</span>
            </div>
            <div className="flex items-center">
              <GlobeIcon className="mr-2 h-4 w-4 text-muted-foreground" />

              <span>Ships from {product.supplier.country}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />

              <span>
                {product.customizationAvailable
                  ? "Customizable"
                  : "Standard Product"}
              </span>
            </div>
          </div>

          <Separator />

          <ProductVariantsSelector
            variants={product.variants}
            currency={product.currency}
            onVariantChange={(variant) =>
              console.log("Selected variant:", variant)
            }
            onQuantityChange={(qty) => console.log("Quantity changed:", qty)}
            onAddToCart={(variant, qty) =>
              console.log("Added to cart:", variant, qty)
            }
          />

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg border p-3 text-center">
              <ShieldIcon className="mb-2 h-6 w-6 text-primary" />

              <span className="text-xs">Verified Supplier</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-3 text-center">
              <FileTextIcon className="mb-2 h-6 w-6 text-primary" />

              <span className="text-xs">Trade Assurance</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-3 text-center">
              <CheckIcon className="mb-2 h-6 w-6 text-primary" />

              <span className="text-xs">Quality Inspection</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border p-3 text-center">
              <TruckIcon className="mb-2 h-6 w-6 text-primary" />

              <span className="text-xs">Global Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping & Payment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none dark:prose-invert">
                <p>{product.description}</p>
                <h3>Key Features</h3>
                <ul>
                  {product.specifications.slice(0, 3).map((spec) => (
                    <li key={spec.name}>
                      <strong>{spec.name}:</strong> {spec.value}
                    </li>
                  ))}
                </ul>
                <h3>Applications</h3>
                <p>
                  This product is suitable for various industrial applications
                  including manufacturing, construction, and general workplace
                  safety requirements.
                </p>
                <h3>Customization</h3>
                <p>
                  {product.customizationAvailable
                    ? "Customization options are available for this product. Please contact the supplier for more information about custom specifications, branding, and minimum order quantities for customized versions."
                    : "This is a standard product without customization options."}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <ProductSpecifications specifications={product.specifications} />
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    Shipping Information
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Standard shipping time: {product.shippingTime}
                  </p>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-medium">Shipping Methods</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>Sea Freight</li>
                      <li>Air Freight</li>
                      <li>Express Delivery (DHL, FedEx, UPS)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Payment Methods</h3>
                  <div className="rounded-lg border p-4">
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      {product.paymentMethods.map((method) => (
                        <li key={method}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <SupplierInfoCard
            id={product.supplier.id}
            name={product.supplier.name}
            logo={product.supplier.logo}
            country={product.supplier.country}
            responseRate={product.supplier.responseRate}
            responseTime={product.supplier.responseTime}
            yearEstablished={product.supplier.yearEstablished}
            verificationLevel={product.supplier.verificationLevel}
            rating={product.supplier.rating}
            reviewCount={product.supplier.reviewCount}
          />

          <ProductInquiryForm
            productName={product.title}
            productId={product.id}
            minOrder={product.minOrder}
            supplierName={product.supplier.name}
            onSubmit={(values) => console.log("Inquiry submitted:", values)}
          />
        </div>
      </div>

      <div className="mt-16">
        <RelatedProducts
          title="Similar Products"
          products={relatedProducts.map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            image: p.images[0],
            price: p.price,
            currency: p.currency,
            minOrder: p.minOrder,
            rating: p.rating,
            reviewCount: p.reviewCount,
            supplier: {
              name: p.supplier.name,
              country: p.supplier.country,
              verificationLevel: p.supplier.verificationLevel,
              responseRate: p.supplier.responseRate,
            },
            featured: p.featured,
          }))}
          viewAllLink={`/category/${product.categoryId}`}
        />
      </div>
    </div>
  );
}
