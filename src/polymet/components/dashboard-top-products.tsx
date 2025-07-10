import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  sales: number;
  percentage: number;
  trend: "up" | "down" | "neutral";
  trendValue: number;
}

interface DashboardTopProductsProps {
  products: Product[];
  maxSales: number;
  className?: string;
}

export default function DashboardTopProducts({
  products,
  maxSales,
  className,
}: DashboardTopProductsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Products</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/products">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {products.map((product) => (
            <div key={product.id}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-medium">{product.sales}</div>
                    <div className="flex items-center text-xs">
                      {product.trend === "up" ? (
                        <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                      ) : product.trend === "down" ? (
                        <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                      ) : null}
                      <span
                        className={cn({
                          "text-green-500": product.trend === "up",
                          "text-red-500": product.trend === "down",
                          "text-muted-foreground": product.trend === "neutral",
                        })}
                      >
                        {product.trendValue}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Progress
                value={product.percentage}
                className="h-2"
                indicatorClassName={cn({
                  "bg-green-500": product.trend === "up",
                  "bg-red-500": product.trend === "down",
                  "bg-primary": product.trend === "neutral",
                })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
