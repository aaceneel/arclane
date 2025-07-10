import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckIcon,
  ClockIcon,
  MessageSquareIcon,
  StarIcon,
} from "lucide-react";
import SupplierVerificationBadge from "@/polymet/components/supplier-verification-badge";

export interface SupplierInfoCardProps {
  id: string;
  name: string;
  logo: string;
  country: string;
  responseRate: number;
  responseTime: string;
  yearEstablished: number;
  verificationLevel: "verified" | "gold" | "platinum";
  rating: number;
  reviewCount: number;
  showContactButtons?: boolean;
}

export default function SupplierInfoCard({
  id,
  name,
  logo,
  country,
  responseRate,
  responseTime,
  yearEstablished,
  verificationLevel,
  rating,
  reviewCount,
  showContactButtons = true,
}: SupplierInfoCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Link to={`/supplier/${id}`} className="shrink-0">
            <img
              src={logo}
              alt={name}
              className="h-16 w-16 rounded-md object-cover border"
            />
          </Link>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <Link to={`/supplier/${id}`} className="hover:underline">
                <h3 className="font-semibold">{name}</h3>
              </Link>
              <SupplierVerificationBadge level={verificationLevel} size="sm" />
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
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <CheckIcon className="mr-2 h-4 w-4 text-green-500" />

            <span className="text-muted-foreground">
              {responseRate}% Response Rate
            </span>
          </div>
          <div className="flex items-center text-sm">
            <ClockIcon className="mr-2 h-4 w-4 text-blue-500" />

            <span className="text-muted-foreground">
              {responseTime} Response Time
            </span>
          </div>
        </div>

        {showContactButtons && (
          <div className="mt-4 flex gap-3">
            <Button variant="outline" className="flex-1">
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button className="flex-1" asChild>
              <Link to={`/supplier/${id}`}>View Profile</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
