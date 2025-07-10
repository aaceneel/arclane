import { useParams } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BuildingIcon,
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  GlobeIcon,
  MailIcon,
  MessageSquareIcon,
  PackageIcon,
  PhoneIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import Breadcrumb from "@/polymet/components/breadcrumb";
import ProductList from "@/polymet/components/product-list";
import SupplierVerificationBadge from "@/polymet/components/supplier-verification-badge";
import { SUPPLIERS, PRODUCTS } from "@/polymet/data/product-data";

export default function SupplierProfilePage() {
  const { supplierId = "sup-001" } = useParams();
  const [activeTab, setActiveTab] = useState("products");

  // Find the supplier by ID
  const supplier = SUPPLIERS.find((s) => s.id === supplierId) || SUPPLIERS[4]; // Default to SafetyFirst Equipment

  // Get products from this supplier
  const supplierProducts = PRODUCTS.filter(
    (product) => product.supplier.id === supplier.id
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
      name: supplier.name,
      country: supplier.country,
      verificationLevel: supplier.verificationLevel,
      responseRate: supplier.responseRate,
    },
    featured: product.featured,
  }));

  const breadcrumbItems = [
    { label: "Suppliers", href: "/suppliers" },
    { label: supplier.name },
  ];

  const companyStats = [
    {
      title: "Year Est.",
      value: supplier.yearEstablished,
      icon: BuildingIcon,
    },
    {
      title: "Response Rate",
      value: `${supplier.responseRate}%`,
      icon: CheckIcon,
    },
    {
      title: "Response Time",
      value: supplier.responseTime,
      icon: ClockIcon,
    },
    {
      title: "Total Revenue",
      value: supplier.totalRevenue,
      icon: TruckIcon,
    },
  ];

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Supplier Header */}
      <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Logo and basic info */}
          <div className="flex flex-1 gap-6">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border">
              <img
                src={supplier.logo}
                alt={supplier.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{supplier.name}</h1>
                  <SupplierVerificationBadge
                    level={supplier.verificationLevel}
                    size="lg"
                  />
                </div>
                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <GlobeIcon className="h-4 w-4" />

                  <span>{supplier.country}</span>
                  <span className="text-xs">•</span>
                  <span>Since {supplier.yearEstablished}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(supplier.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{supplier.rating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({supplier.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button variant="outline" className="flex-1">
              <FileTextIcon className="mr-2 h-4 w-4" />
              RFQ
            </Button>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - Company info */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {companyStats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <stat.icon className="h-4 w-4" />

                      <span>{stat.title}</span>
                    </div>
                    <div className="mt-1 font-medium">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-medium">Main Products</h3>
                <div className="flex flex-wrap gap-2">
                  {supplier.mainProducts.map((product, index) => (
                    <Badge key={index} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-medium">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {supplier.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline">
                      <ShieldIcon className="mr-1 h-3 w-3" />

                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UsersIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <div className="font-medium">Contact Person</div>
                    <div className="text-muted-foreground">
                      Sarah Johnson, Sales Manager
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">
                      contact@safetyfirst.example.com
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GlobeIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-muted-foreground">
                      www.safetyfirst-equipment.example.com
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Products and other tabs */}
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="products"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Products ({supplierProducts.length})
                </h2>
              </div>

              {supplierProducts.length > 0 ? (
                <ProductList
                  products={supplierProducts}
                  showSortOptions={true}
                  showViewOptions={true}
                />
              ) : (
                <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <PackageIcon className="mb-4 h-12 w-12 text-muted-foreground" />

                  <p className="mb-2 text-lg font-medium">No products found</p>
                  <p className="text-sm text-muted-foreground">
                    This supplier hasn't added any products yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium">About {supplier.name}</h3>
                    <p className="text-muted-foreground">
                      {supplier.name} is a leading manufacturer and supplier of
                      high-quality safety equipment and protective gear for
                      industrial applications. With over{" "}
                      {new Date().getFullYear() - supplier.yearEstablished}{" "}
                      years of experience in the industry, we specialize in
                      providing innovative safety solutions that meet
                      international standards and regulations.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Business Type</h3>
                    <p className="text-muted-foreground">
                      Manufacturer, Trading Company
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Main Markets</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">North America</Badge>
                      <Badge variant="secondary">Europe</Badge>
                      <Badge variant="secondary">Asia</Badge>
                      <Badge variant="secondary">Australia</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Factory Information</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Factory Size
                        </div>
                        <div>25,000 sq. meters</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Production Lines
                        </div>
                        <div>12</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          R&D Staff
                        </div>
                        <div>35 people</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Quality Control
                        </div>
                        <div>ISO 9001 Certified</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {supplier.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-b pb-4 last:border-0"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <ShieldIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{cert}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert === "ISO 9001" &&
                            "Quality Management System certification ensuring consistent quality products and services."}
                          {cert === "ISO 14001" &&
                            "Environmental Management System certification demonstrating commitment to environmental responsibility."}
                          {cert === "OHSAS 18001" &&
                            "Occupational Health and Safety Management certification ensuring workplace safety standards."}
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Valid until: December 2025
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Additional Compliance</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        ANSI/ISEA Z87.1-2020 (Eye Protection)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        ANSI/ISEA Z89.1-2014 (Head Protection)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        EN 166:2001 (European Eye Protection)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        CE Marking (European Conformity)
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact {supplier.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter message subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message here"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
