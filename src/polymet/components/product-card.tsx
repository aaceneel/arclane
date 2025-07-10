import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckIcon,
  MessageSquareIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";

export interface ProductCardProps {
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
  variant?: "default" | "compact";
}

export default function ProductCard({
  id,
  title,
  slug,
  image,
  price,
  currency,
  minOrder,
  rating,
  reviewCount,
  supplier,
  featured = false,
  variant = "default",
}: ProductCardProps) {
  const isCompact = variant === "compact";

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const priceDisplay =
    price.min === price.max
      ? formatPrice(price.min)
      : `${formatPrice(price.min)} - ${formatPrice(price.max)}`;

  const verificationBadgeColor = {
    verified:
      "bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-400",
    gold: "bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-400",
    platinum:
      "bg-purple-100 text-purple-800 dark:bg-purple-400/20 dark:text-purple-400",
  };

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${featured ? "border-primary/20" : ""}`}
    >
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="default">Featured</Badge>
        </div>
      )}
      <Link to={`/product/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className={`${isCompact ? "p-3" : "p-4"} pb-0`}>
        <Link
          to={`/product/${slug}`}
          className="line-clamp-2 font-medium hover:underline"
        >
          {title}
        </Link>
      </CardHeader>
      <CardContent className={`${isCompact ? "p-3" : "p-4"}`}>
        <div className="flex flex-col space-y-1.5">
          <div className="text-lg font-semibold">{priceDisplay}</div>
          <div className="text-sm text-muted-foreground">
            Min. Order: {minOrder} {minOrder === 1 ? "unit" : "units"}
          </div>
          <div className="flex items-center mt-1">
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
      </CardContent>
      {!isCompact && (
        <CardFooter className="flex flex-col items-start p-4 pt-0 gap-3">
          <div className="flex items-center w-full">
            <div className="flex flex-col">
              <div className="text-sm font-medium">{supplier.name}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {supplier.country}
                <span className="mx-1">•</span>
                <Badge
                  variant="outline"
                  className={`text-xs py-0 px-1 ${verificationBadgeColor[supplier.verificationLevel]}`}
                >
                  {supplier.verificationLevel.charAt(0).toUpperCase() +
                    supplier.verificationLevel.slice(1)}
                </Badge>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="ml-auto flex items-center text-xs text-muted-foreground">
                    <CheckIcon className="h-3 w-3 mr-1 text-green-500" />

                    <span>{supplier.responseRate}% Response</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Responds to {supplier.responseRate}% of messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex w-full gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button size="sm" className="flex-1">
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              Inquire
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
