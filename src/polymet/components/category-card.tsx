import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  image?: string;
  productCount?: number;
  variant?: "default" | "small" | "icon";
}

export default function CategoryCard({
  id,
  name,
  slug,
  image,
  productCount,
  variant = "default",
}: CategoryCardProps) {
  if (variant === "icon") {
    return (
      <Link to={`/category/${slug}`} className="block">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-secondary" />
            )}
          </div>
          <div className="text-sm font-medium">{name}</div>
          {productCount !== undefined && (
            <div className="text-xs text-muted-foreground">
              {productCount} {productCount === 1 ? "product" : "products"}
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "small") {
    return (
      <Link to={`/category/${slug}`} className="block">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="flex items-center gap-3 p-3">
            {image ? (
              <div className="h-10 w-10 overflow-hidden rounded-md">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-md bg-muted" />
            )}
            <div>
              <div className="font-medium">{name}</div>
              {productCount !== undefined && (
                <div className="text-xs text-muted-foreground">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/category/${slug}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-2xl font-bold text-muted-foreground">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="font-medium">{name}</div>
          {productCount !== undefined && (
            <div className="text-sm text-muted-foreground">
              {productCount} {productCount === 1 ? "product" : "products"}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
