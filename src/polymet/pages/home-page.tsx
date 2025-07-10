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
import {
  FEATURED_PRODUCTS,
  PRODUCT_CATEGORIES,
  SUPPLIERS,
} from "@/polymet/data/product-data";
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

  const featuredCategories = PRODUCT_CATEGORIES.slice(0, 6);
  const featuredProducts = FEATURED_PRODUCTS.slice(0, 8);
  const topSuppliers = SUPPLIERS.slice(0, 4);

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
                        categories={PRODUCT_CATEGORIES.map((cat) => ({
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
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold">Browse Categories</h2>
              <p className="text-muted-foreground">
                Explore our wide range of product categories
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/categories">
                View All Categories
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {featuredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                slug={category.slug}
                image={category.image}
                variant="icon"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground">
                Discover our selection of top products
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                image={product.images[0]}
                price={product.price}
                currency={product.currency}
                minOrder={product.minOrder}
                rating={product.rating}
                reviewCount={product.reviewCount}
                supplier={{
                  name: product.supplier.name,
                  country: product.supplier.country,
                  verificationLevel: product.supplier.verificationLevel,
                  responseRate: product.supplier.responseRate,
                }}
                featured={product.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Suppliers Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold">Top Suppliers</h2>
              <p className="text-muted-foreground">
                Connect with our verified and trusted suppliers
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/suppliers">
                View All Suppliers
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {topSuppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                id={supplier.id}
                name={supplier.name}
                logo={supplier.logo}
                country={supplier.country}
                responseRate={supplier.responseRate}
                responseTime={supplier.responseTime}
                yearEstablished={supplier.yearEstablished}
                mainProducts={supplier.mainProducts}
                certifications={supplier.certifications}
                rating={supplier.rating}
                reviewCount={supplier.reviewCount}
                verificationLevel={supplier.verificationLevel}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Hear from businesses that have found success on our platform
            </p>
          </div>

          <Carousel className="mx-auto max-w-4xl">
            <CarouselContent>
              {[1, 2, 3].map((index) => (
                <CarouselItem key={index}>
                  <Card className="border-none bg-background shadow-sm">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 h-16 w-16 overflow-hidden rounded-full border-4 border-background shadow-md">
                        <img
                          src={`https://github.com/yusufhilmi.png`}
                          alt={`Testimonial ${index}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mb-4 text-lg italic">
                        "Polymet has transformed how we source materials. We've
                        found reliable suppliers and reduced our procurement
                        costs by 23% in just six months."
                      </p>
                      <div>
                        <h4 className="font-semibold">Sarah Johnson</h4>
                        <p className="text-sm text-muted-foreground">
                          Procurement Manager, TechInnovate Inc.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />

            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why Choose Polymet</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              We provide a secure and efficient platform for global B2B trade
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GlobeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Global Reach</h3>
              <p className="text-muted-foreground">
                Connect with suppliers and buyers from over 150 countries
                worldwide
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Verified Suppliers</h3>
              <p className="text-muted-foreground">
                All suppliers undergo rigorous verification and quality checks
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BuildingIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Business Solutions</h3>
              <p className="text-muted-foreground">
                Comprehensive tools and services to support your business growth
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Logistics Support</h3>
              <p className="text-muted-foreground">
                End-to-end logistics solutions for seamless international trade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-4xl font-bold">150+</div>
              <div className="mt-2">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold">10K+</div>
              <div className="mt-2">Suppliers</div>
            </div>
            <div>
              <div className="text-4xl font-bold">500K+</div>
              <div className="mt-2">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold">2M+</div>
              <div className="mt-2">Buyers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-lg bg-muted p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">
                  Ready to Grow Your Business?
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Join thousands of businesses that use Polymet to source
                  products and find new customers.
                </p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <Button size="lg" asChild>
                    <Link to="/register">Join as Buyer</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/supplier-register">Become a Supplier</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <CheckIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Free Account Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Create your account and start browsing products in minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <CheckIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dedicated Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team is available to help you with any questions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <CheckIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Transactions</h3>
                    <p className="text-sm text-muted-foreground">
                      Trade with confidence using our secure payment options
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StarIcon(props) {
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
