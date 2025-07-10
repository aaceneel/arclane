import { Link } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  showHomeIcon?: boolean;
}

export default function Breadcrumb({
  items,
  homeHref = "/",
  showHomeIcon = true,
}: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {showHomeIcon && (
          <li>
            <Link
              to={homeHref}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <HomeIcon className="h-3.5 w-3.5" />

              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {(index > 0 || showHomeIcon) && (
              <ChevronRightIcon className="mx-1 h-4 w-4 text-muted-foreground" />
            )}
            {index === items.length - 1 || !item.href ? (
              <span className="text-foreground">{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
