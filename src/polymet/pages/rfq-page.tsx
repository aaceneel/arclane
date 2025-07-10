import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BuildingIcon,
  CheckCircleIcon,
  GlobeIcon,
  ShieldIcon,
  TruckIcon,
} from "lucide-react";
import RfqForm from "@/polymet/components/rfq-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function RfqPage() {
  const [activeTab, setActiveTab] = useState("submit");

  const categories = [
    { id: "industrial-supplies", name: "Industrial Supplies" },
    { id: "electronics", name: "Electronics" },
    { id: "machinery", name: "Machinery" },
    { id: "raw-materials", name: "Raw Materials" },
    { id: "packaging", name: "Packaging" },
    { id: "office-supplies", name: "Office Supplies" },
  ];

  const benefits = [
    {
      icon: <GlobeIcon className="h-10 w-10 text-primary" />,

      title: "Global Reach",
      description:
        "Connect with suppliers worldwide and expand your sourcing options",
    },
    {
      icon: <CheckCircleIcon className="h-10 w-10 text-primary" />,

      title: "Verified Suppliers",
      description:
        "Get quotes from pre-verified suppliers with proven track records",
    },
    {
      icon: <TruckIcon className="h-10 w-10 text-primary" />,

      title: "Competitive Offers",
      description: "Compare multiple quotes to find the best price and terms",
    },
    {
      icon: <ShieldIcon className="h-10 w-10 text-primary" />,

      title: "Secure Process",
      description:
        "Your information is protected and only shared with qualified suppliers",
    },
    {
      icon: <BuildingIcon className="h-10 w-10 text-primary" />,

      title: "Business Efficiency",
      description:
        "Save time by submitting one RFQ instead of contacting suppliers individually",
    },
  ];

  const handleSubmit = (values) => {
    console.log("RFQ submitted:", values);
    // In a real implementation, this would send the data to a backend API
    setActiveTab("success");
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Request for Quotation
          </h1>
          <p className="text-lg text-muted-foreground">
            Get competitive quotes from multiple suppliers with a single request
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit">Submit RFQ</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          </TabsList>
          <TabsContent value="submit" className="mt-6">
            {activeTab === "success" ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">
                    RFQ Submitted Successfully!
                  </h2>
                  <p className="mb-6 max-w-md text-muted-foreground">
                    Your request for quotation has been sent to matching
                    suppliers. You'll receive responses directly to your email
                    within 24-48 hours.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/"
                      className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                    >
                      Return to Homepage
                    </Link>
                    <button
                      onClick={() => setActiveTab("submit")}
                      className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      Submit Another RFQ
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <RfqForm categories={categories} onSubmit={handleSubmit} />
            )}
          </TabsContent>
          <TabsContent value="how-it-works" className="mt-6">
            <Card>
              <CardContent className="py-6">
                <h2 className="mb-6 text-2xl font-bold">
                  How the RFQ Process Works
                </h2>

                <ol className="mb-8 space-y-6">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Submit Your Request
                      </h3>
                      <p className="text-muted-foreground">
                        Fill out the RFQ form with your product requirements,
                        specifications, and commercial terms.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Supplier Matching
                      </h3>
                      <p className="text-muted-foreground">
                        Our system automatically matches your request with
                        qualified suppliers who can meet your requirements.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Receive Quotes</h3>
                      <p className="text-muted-foreground">
                        Suppliers review your request and send their best offers
                        directly to your email within 24-48 hours.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Compare and Select
                      </h3>
                      <p className="text-muted-foreground">
                        Compare the quotes you receive based on price, quality,
                        delivery time, and supplier credentials.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      5
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Finalize Your Order
                      </h3>
                      <p className="text-muted-foreground">
                        Contact your chosen supplier directly to negotiate final
                        terms and place your order.
                      </p>
                    </div>
                  </li>
                </ol>

                <button
                  onClick={() => setActiveTab("submit")}
                  className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Submit an RFQ Now
                </button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Why Use Our RFQ Service?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
