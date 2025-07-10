import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, ShieldIcon } from "lucide-react";

export interface SupplierVerificationBadgeProps {
  level: "verified" | "gold" | "platinum";
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function SupplierVerificationBadge({
  level,
  showTooltip = true,
  size = "md",
}: SupplierVerificationBadgeProps) {
  const badgeConfig = {
    verified: {
      label: "Verified",
      description: "Basic verification of business license and contact details",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-400",
      icon: CheckIcon,
    },
    gold: {
      label: "Gold",
      description:
        "Verified supplier with good track record and on-site inspection",
      className:
        "bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-400",
      icon: ShieldIcon,
    },
    platinum: {
      label: "Platinum",
      description:
        "Premium verified supplier with excellent track record, financial stability, and third-party certifications",
      className:
        "bg-purple-100 text-purple-800 dark:bg-purple-400/20 dark:text-purple-400",
      icon: ShieldIcon,
    },
  };

  const config = badgeConfig[level];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs py-0 h-5",
    md: "text-sm py-0.5",
    lg: "text-base py-1",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  const badge = (
    <Badge
      variant="outline"
      className={`${config.className} ${sizeClasses[size]} flex items-center gap-1 font-medium`}
    >
      <Icon className={iconSizes[size]} />

      {config.label}
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="font-semibold">{config.label} Supplier</p>
            <p className="text-sm">{config.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
