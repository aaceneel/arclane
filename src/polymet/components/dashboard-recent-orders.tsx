import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { EyeIcon, FileTextIcon } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    avatar?: string;
    company: string;
  };
  date: string;
  amount: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
}

interface DashboardRecentOrdersProps {
  orders: Order[];
  className?: string;
}

export default function DashboardRecentOrders({
  orders,
  className,
}: DashboardRecentOrdersProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "shipped":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/orders">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={order.customer.avatar} />

                  <AvatarFallback>
                    {order.customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{order.orderNumber}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer.company}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">{order.amount}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.date}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", getStatusColor(order.status))}
                >
                  {order.status}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link to={`/orders/${order.id}`}>
                      <EyeIcon className="h-4 w-4" />

                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link to={`/orders/${order.id}/invoice`}>
                      <FileTextIcon className="h-4 w-4" />

                      <span className="sr-only">Invoice</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
