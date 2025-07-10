"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/polymet/components/breadcrumb";
import Pagination from "@/polymet/components/pagination";
import ProductFilter from "@/polymet/components/product-filter";
import ProductList from "@/polymet/components/product-list";
import { PRODUCTS } from "@/polymet/data/product-data";
import {
  Clock,
  FilterIcon,
  PackageIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "lucide-react";

export default function ReadyToShipPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedShippingTime, setSelectedShippingTime] = useState("all");

  // Fetch products that are ready to ship
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Filter products that have stock and are ready to ship
      const readyToShipProducts = PRODUCTS.filter((product) => {
        // Check if any variant has stock
        const hasStock = product.variants.some((variant) => variant.stock > 0);

        // Filter by shipping time if selected
        if (selectedShippingTime !== "all") {
          const shippingDays = parseShippingTime(product.shippingTime);

          switch (selectedShippingTime) {
            case "24h":
              return hasStock && shippingDays <= 1;
            case "3days":
              return hasStock && shippingDays <= 3;
            case "7days":
              return hasStock && shippingDays <= 7;
            default:
              return hasStock;
          }
        }

        return hasStock;
      }).map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        currency: product.currency,
        minOrder: product.minOrder,
        rating: product.rating,
        reviewCount: product.reviewCount,
        supplier: {
          name: product.supplier.name,
          country: product.supplier.country,
          verificationLevel: product.supplier.verificationLevel,
          responseRate: product.supplier.responseRate,
        },
        featured: product.featured,
        shippingTime: product.shippingTime,
      }));

      setProducts(readyToShipProducts);
      setIsLoading(false);
    }, 500);
  }, [selectedShippingTime]);

  // Helper function to parse shipping time string to number of days
  const parseShippingTime = (shippingTime: string): number => {
    const match = shippingTime.match(/(\d+)-(\d+)/);
    if (match) {
      // Return the minimum shipping days
      return parseInt(match[1]);
    }
    return 999; // Default high value if format doesn't match
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Ready to Ship" },
  ];

  // Mock filter groups
  const filterGroups = {
    categories: {
      id: "categories",
      name: "Categories",
      options: [
        { id: "industrial-supplies", label: "Industrial Supplies", count: 24 },
        { id: "electronics", label: "Electronics", count: 18 },
        { id: "machinery", label: "Machinery", count: 12 },
        { id: "raw-materials", label: "Raw Materials", count: 9 },
        { id: "packaging", label: "Packaging", count: 15 },
        { id: "office-supplies", label: "Office Supplies", count: 7 },
      ],

      expanded: true,
    },
    suppliers: {
      id: "suppliers",
      name: "Suppliers",
      options: [
        { id: "sup-001", label: "TechPro Industries", count: 24 },
        { id: "sup-002", label: "Global Materials Co.", count: 18 },
        { id: "sup-003", label: "PackMaster Solutions", count: 12 },
        { id: "sup-004", label: "MachineWorks Ltd.", count: 9 },
        { id: "sup-005", label: "SafetyFirst Equipment", count: 15 },
      ],

      expanded: true,
    },
    certifications: {
      id: "certifications",
      name: "Certifications",
      options: [
        { id: "cert-1", label: "ISO 9001", count: 32 },
        { id: "cert-2", label: "ISO 14001", count: 18 },
        { id: "cert-3", label: "OHSAS 18001", count: 9 },
        { id: "cert-4", label: "CE", count: 24 },
        { id: "cert-5", label: "RoHS", count: 17 },
      ],

      expanded: true,
    },
  };

  return (
    <div className="container py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold">Ready to Ship Products</h1>
        <p className="mt-2 text-muted-foreground">
          Products in stock and available for immediate shipping
        </p>
      </div>

      {/* Benefits section */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <TruckIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Quick delivery to your location
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <PackageIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">In Stock</h3>
              <p className="text-sm text-muted-foreground">
                No waiting for production
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Pre-inspected products
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Time Saving</h3>
              <p className="text-sm text-muted-foreground">
                Reduce procurement time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipping time filter tabs */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Shipping Time</h2>
        <Tabs
          defaultValue="all"
          value={selectedShippingTime}
          onValueChange={setSelectedShippingTime}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="24h">Ships in 24h</TabsTrigger>
            <TabsTrigger value="3days">Ships in 3 Days</TabsTrigger>
            <TabsTrigger value="7days">Ships in 7 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row lg:gap-8">
        <div className="mb-6 lg:mb-0 lg:w-64">
          <div className="sticky top-24">
            <div className="hidden lg:block">
              <ProductFilter
                categories={filterGroups.categories}
                suppliers={filterGroups.suppliers}
                certifications={filterGroups.certifications}
                priceRange={{ min: 0, max: 10000, currency: "USD" }}
                minOrderRange={{ min: 1, max: 1000 }}
              />
            </div>
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FilterIcon className="mr-2 h-4 w-4" />

                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
              {isFilterOpen && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <ProductFilter
                      categories={filterGroups.categories}
                      suppliers={filterGroups.suppliers}
                      certifications={filterGroups.certifications}
                      priceRange={{ min: 0, max: 10000, currency: "USD" }}
                      minOrderRange={{ min: 1, max: 1000 }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              {products.length} products found
            </p>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="shipping">Fastest Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProductList
            products={paginatedProducts}
            isLoading={isLoading}
            emptyMessage="No ready-to-ship products found matching your criteria"
          />

          {products.length > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[12, 24, 48, 96]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
