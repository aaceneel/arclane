"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryCard from "@/polymet/components/category-card";
import ProductCard from "@/polymet/components/product-card";
import RfqForm from "@/polymet/components/rfq-form";
import SupplierCard from "@/polymet/components/supplier-card";
import { useProducts, useCategories, useSuppliers } from "@/hooks/useSupabase";
import {
  ArrowRightIcon,
  BuildingIcon,
  CheckIcon,
  GlobeIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Use Supabase hooks instead of mock data
  const { products: allProducts, loading: productsLoading } = useProducts({ featured: true, limit: 8 });
  const { categories, loading: categoriesLoading } = useCategories();
  const { suppliers, loading: suppliersLoading } = useSuppliers(4);

  // Use the data from Supabase or fallback to empty arrays with proper null checks
  const featuredCategories = categories?.slice(0, 6) || [];
  const featuredProducts = allProducts || [];
  const topSuppliers = suppliers || [];

  // Show loading state for critical sections
  if (categoriesLoading || productsLoading || suppliersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-background py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute left-1/4 top-1/3 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-primary/5 blur-3xl"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/grid/20/20')] bg-[length:20px_20px] opacity-[0.015]"></div>
        </div>

        <div className="container relative">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-primary/20 text-primary font-medium px-4 py-1"
                >
                  Trusted by 2M+ Businesses Worldwide
                </Badge>
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Global B2B Marketplace for Your Business
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connect with verified suppliers, source quality products, and
                  grow your business globally.
                </p>
              </div>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products, suppliers..."
                    className="pl-10 border-2 focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="text-sm bg-background/80 backdrop-blur-sm"
                >
                  Industrial Equipment
                </Badge>
                <Badge
                  variant="outline"
                  className="text-sm bg-background/80 backdrop-blur-sm"
                >
                  Electronics
                </Badge>
                <Badge
                  variant="outline"
                  className="text-sm bg-background/80 backdrop-blur-sm"
                >
                  Raw Materials
                </Badge>
                <Badge
                  variant="outline"
                  className="text-sm bg-background/80 backdrop-blur-sm"
                >
                  Packaging
                </Badge>
              </div>

              <div className="hidden md:flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://github.com/yusufhilmi.png"
                      alt="User"
                      className="h-8 w-8 rounded-full border-2 border-background"
                    />
                    <img
                      src="https://github.com/furkanksl.png"
                      alt="User"
                      className="h-8 w-8 rounded-full border-2 border-background"
                    />
                    <img
                      src="https://github.com/kdrnp.png"
                      alt="User"
                      className="h-8 w-8 rounded-full border-2 border-background"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Trusted by 10K+ suppliers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    4.9 (2,500+ reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md border-2 shadow-lg">
                <CardContent className="p-6">
                  <Tabs defaultValue="rfq" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="rfq" className="text-sm">
                        Request for Quotation
                      </TabsTrigger>
                      <TabsTrigger value="join" className="text-sm">
                        Join as Supplier
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="rfq" className="mt-0">
                      <RfqForm
                        categories={featuredCategories
                          .filter((cat) => cat && cat.id && cat.name)
                          .map((cat) => ({
                            id: cat.id,
                            name: cat.name,
                          }))}
                        variant="compact"
                      />
                    </TabsContent>
                    <TabsContent value="join" className="mt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">
                            Become a Supplier
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Join our global marketplace and reach buyers
                            worldwide
                          </p>
                        </div>
                        <div className="space-y-3">
                          <Input placeholder="Company Name" />
                          <Input placeholder="Email Address" type="email" />
                          <Input placeholder="Phone Number" type="tel" />
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Join Now
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trusted By Logos */}
          <div className="mt-12 md:mt-16 border-t border-border/40 pt-8">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Trusted by leading companies worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
              <div className="flex items-center gap-2 font-semibold">
                <PackageIcon className="h-5 w-5" />
                <span>TechCorp</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <BuildingIcon className="h-5 w-5" />
                <span>IndustrialPro</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <ShieldIcon className="h-5 w-5" />
                <span>SafetyFirst</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <GlobeIcon className="h-5 w-5" />
                <span>GlobalTrade</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <TruckIcon className="h-5 w-5" />
                <span>LogisticsMaster</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive product categories and find exactly what
              your business needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {featuredCategories.length > 0 ? (
              featuredCategories.map((category) => (
                <CategoryCard 
                  key={category?.id || Math.random()}
                  id={category.id}
                  name={category.name}
                  slug={category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}
                  image={category.image}
                  productCount={category.product_count}
                  variant="icon"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">Loading categories...</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/categories">
                View All Categories
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover trending products from verified suppliers around the
              world.
            </p>
          </div>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                    <CarouselItem 
                      key={product?.id || Math.random()} 
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <ProductCard 
                        id={product.id}
                        title={product.title}
                        slug={product.slug}
                        image={product.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'}
                        price={{
                          min: product.price_min || 0,
                          max: product.price_max || product.price_min || 0
                        }}
                        currency={product.currency || 'USD'}
                        minOrder={product.min_order || 1}
                        rating={product.rating || 0}
                        reviewCount={product.review_count || 0}
                        supplier={{
                          name: product.suppliers?.name || 'Unknown Supplier',
                          country: product.suppliers?.country || 'Unknown',
                          verificationLevel: product.suppliers?.verification_level as "verified" | "gold" | "platinum" || 'verified',
                          responseRate: product.suppliers?.response_rate || 0
                        }}
                        featured={product.featured || false}
                      />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem className="pl-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Loading products...</p>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              {featuredProducts.length > 4 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Suppliers Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Suppliers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with verified suppliers who consistently deliver quality
              products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {topSuppliers.length > 0 ? (
              topSuppliers.map((supplier) => (
                <SupplierCard 
                  key={supplier?.id || Math.random()}
                  id={supplier.id}
                  name={supplier.name}
                  logo={supplier.logo || 'https://github.com/polymet-ai.png'}
                  country={supplier.country || 'Unknown'}
                  responseRate={supplier.response_rate || 0}
                  responseTime={supplier.response_time || 'Unknown'}
                  yearEstablished={supplier.year_established || 2020}
                  mainProducts={['Industrial Equipment', 'Electronics']} // Default products since not in schema
                  certifications={['ISO 9001', 'CE']} // Default certifications since not in schema
                  rating={supplier.rating || 0}
                  reviewCount={supplier.review_count || 0}
                  verificationLevel={supplier.verification_level as "verified" | "gold" | "platinum" || 'verified'}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">Loading suppliers...</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/suppliers">
                View All Suppliers
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses worldwide who trust Arclane for their
            B2B sourcing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-medium" asChild>
              <Link to="/sign-up">Start Buying</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-medium"
              asChild
            >
              <Link to="/suppliers/join">Become a Supplier</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
