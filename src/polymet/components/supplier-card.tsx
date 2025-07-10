import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckIcon, MessageSquareIcon, StarIcon } from "lucide-react";

export interface SupplierCardProps {
  id: string;
  name: string;
  logo: string;
  country: string;
  responseRate: number;
  responseTime: string;
  yearEstablished: number;
  mainProducts: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  verificationLevel: "verified" | "gold" | "platinum";
  variant?: "default" | "compact";
}

export default function SupplierCard({
  id,
  name,
  logo,
  country,
  responseRate,
  responseTime,
  yearEstablished,
  mainProducts,
  certifications,
  rating,
  reviewCount,
  verificationLevel,
  variant = "default",
}: SupplierCardProps) {
  const isCompact = variant === "compact";

  const verificationBadgeColor = {
    verified:
      "bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-400",
    gold: "bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-400",
    platinum:
      "bg-purple-100 text-purple-800 dark:bg-purple-400/20 dark:text-purple-400",
  };

  const supplierUrl = `/supplier/${id}`;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader
        className={`${isCompact ? "p-4" : "p-6"} pb-0 flex flex-row items-start gap-4`}
      >
        <Link to={supplierUrl} className="shrink-0">
          <img
            src={logo}
            alt={name}
            className="h-16 w-16 rounded-md object-cover border"
          />
        </Link>
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <Link to={supplierUrl} className="hover:underline">
              <h3 className="font-semibold">{name}</h3>
            </Link>
            <Badge className={verificationBadgeColor[verificationLevel]}>
              {verificationLevel.charAt(0).toUpperCase() +
                verificationLevel.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            {country} • Since {yearEstablished}
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`${isCompact ? "p-4" : "p-6"} pt-4`}>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CheckIcon className="mr-2 h-4 w-4 text-green-500" />

            <span className="text-muted-foreground">
              {responseRate}% Response Rate • {responseTime} Response Time
            </span>
          </div>

          {!isCompact && (
            <>
              <div>
                <div className="text-sm font-medium mb-1">Main Products:</div>
                <div className="flex flex-wrap gap-1">
                  {mainProducts.map((product, index) => (
                    <Badge key={index} variant="outline">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              {certifications.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-1">
                    Certifications:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className={`${isCompact ? "p-4" : "p-6"} pt-0`}>
        <div className="flex w-full gap-3">
          <Button variant="outline" className="flex-1">
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button className="flex-1">View Products</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
