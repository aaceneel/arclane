"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/polymet/components/breadcrumb";
import CategoryCard from "@/polymet/components/category-card";
import Pagination from "@/polymet/components/pagination";
import ProductFilter from "@/polymet/components/product-filter";
import ProductList from "@/polymet/components/product-list";
import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  ProductCategory,
} from "@/polymet/data/product-data";
import { FilterIcon } from "lucide-react";

export default function CategoryListingPage() {
  const { categoryId = "" } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [subcategories, setSubcategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Find the category and its subcategories
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Find the main category
      let foundCategory: ProductCategory | null = null;
      let foundSubcategories: ProductCategory[] = [];

      // Check if it's a main category
      const mainCategory = PRODUCT_CATEGORIES.find(
        (cat) => cat.id === categoryId
      );
      if (mainCategory) {
        foundCategory = mainCategory;
        foundSubcategories = mainCategory.subcategories || [];
      } else {
        // Check if it's a subcategory
        for (const mainCat of PRODUCT_CATEGORIES) {
          if (mainCat.subcategories) {
            const subCat = mainCat.subcategories.find(
              (sub) => sub.id === categoryId
            );
            if (subCat) {
              foundCategory = subCat;
              // Sibling subcategories
              foundSubcategories = mainCat.subcategories.filter(
                (sub) => sub.id !== categoryId
              );
              break;
            }
          }
        }
      }

      setCategory(foundCategory);
      setSubcategories(foundSubcategories);

      // Find products in this category
      const categoryProducts = PRODUCTS.filter(
        (product) =>
          product.categoryId === categoryId ||
          foundCategory?.subcategories?.some(
            (sub) => sub.id === product.categoryId
          )
      ).map((product) => ({
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
      }));

      setProducts(categoryProducts);
      setIsLoading(false);
    }, 500);
  }, [categoryId]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [{ label: "Categories", href: "/categories" }];

    // If it's a subcategory, add the parent category
    if (category) {
      const parentCategory = PRODUCT_CATEGORIES.find((cat) =>
        cat.subcategories?.some((sub) => sub.id === categoryId)
      );

      if (parentCategory) {
        items.push({
          label: parentCategory.name,
          href: `/category/${parentCategory.id}`,
        });
      }

      items.push({ label: category.name });
    }

    return items;
  };

  // Mock filter groups
  const filterGroups = {
    categories: {
      id: "categories",
      name: "Categories",
      options: subcategories.map((subcat) => ({
        id: subcat.id,
        label: subcat.name,
        count: Math.floor(Math.random() * 100) + 10,
      })),
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
      <Breadcrumb items={getBreadcrumbItems()} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold">{category?.name || "Category"}</h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} products found in this category
        </p>
      </div>

      {subcategories.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Subcategories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {subcategories.map((subcat) => (
              <CategoryCard
                key={subcat.id}
                id={subcat.id}
                name={subcat.name}
                slug={subcat.id}
                image={subcat.image}
                variant="small"
              />
            ))}
          </div>
        </div>
      )}

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
          <ProductList
            products={paginatedProducts}
            isLoading={isLoading}
            emptyMessage={`No products found in ${category?.name || "this category"}`}
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
