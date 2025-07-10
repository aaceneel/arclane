import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupabaseProductList from "@/polymet/components/supabase-product-list";
import { useProducts, useSuppliers, useCategories } from "@/hooks/useSupabase";

export default function SupabaseTestPage() {
  const { products: allProducts, loading: productsLoading, error: productsError } = useProducts();
  const { suppliers, loading: suppliersLoading, error: suppliersError } = useSuppliers();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Supabase Integration Test</h1>
        <p className="text-lg text-muted-foreground">
          This page demonstrates that your Supabase integration is working correctly.
        </p>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="featured">Featured Products</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Products from Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              {productsLoading && (
                <div className="text-center">Loading products...</div>
              )}
              {productsError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  Error: {productsError}
                </div>
              )}
              {!productsLoading && !productsError && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Found {allProducts?.length || 0} products in the database
                  </p>
                  <SupabaseProductList title="All Products" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suppliers from Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              {suppliersLoading && (
                <div className="text-center">Loading suppliers...</div>
              )}
              {suppliersError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  Error: {suppliersError}
                </div>
              )}
              {!suppliersLoading && !suppliersError && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Found {suppliers?.length || 0} suppliers in the database
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {suppliers?.map((supplier) => (
                      <Card key={supplier.id}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.country}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {supplier.verification_level}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {supplier.response_rate}% response rate
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories from Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              {categoriesLoading && (
                <div className="text-center">Loading categories...</div>
              )}
              {categoriesError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  Error: {categoriesError}
                </div>
              )}
              {!categoriesLoading && !categoriesError && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Found {categories?.length || 0} categories in the database
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories?.map((category) => (
                      <Card key={category.id}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                          <span className="text-xs text-muted-foreground">
                            {category.product_count} products
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Products Only</CardTitle>
            </CardHeader>
            <CardContent>
              <SupabaseProductList 
                title="Featured Products" 
                featured={true}
                limit={8}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🎉 Supabase Integration Status</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className={`border-2 ${!productsError ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl mb-2 ${!productsError ? 'text-green-600' : 'text-red-600'}`}>
                  {!productsError ? '✅' : '❌'}
                </div>
                <h3 className="font-semibold">Products</h3>
                <p className="text-sm text-muted-foreground">
                  {!productsError ? 'Connected' : 'Error'}
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 ${!suppliersError ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl mb-2 ${!suppliersError ? 'text-green-600' : 'text-red-600'}`}>
                  {!suppliersError ? '✅' : '❌'}
                </div>
                <h3 className="font-semibold">Suppliers</h3>
                <p className="text-sm text-muted-foreground">
                  {!suppliersError ? 'Connected' : 'Error'}
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 ${!categoriesError ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl mb-2 ${!categoriesError ? 'text-green-600' : 'text-red-600'}`}>
                  {!categoriesError ? '✅' : '❌'}
                </div>
                <h3 className="font-semibold">Categories</h3>
                <p className="text-sm text-muted-foreground">
                  {!categoriesError ? 'Connected' : 'Error'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 