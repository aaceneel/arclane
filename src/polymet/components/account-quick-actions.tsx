import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileTextIcon,
  MessageSquareIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
}

export default function AccountQuickActions() {
  const quickActions: QuickAction[] = [
    {
      icon: ShoppingCartIcon,
      label: "Place Order",
      description: "Browse products and place a new order",
      href: "/",
    },
    {
      icon: PackageIcon,
      label: "Submit RFQ",
      description: "Request quotes for custom requirements",
      href: "/rfq",
    },
    {
      icon: MessageSquareIcon,
      label: "Contact Support",
      description: "Get help with your account or orders",
      href: "/account/support",
    },
    {
      icon: FileTextIcon,
      label: "View Invoices",
      description: "Access and download your invoices",
      href: "/account/invoices",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex items-start gap-3 p-4 justify-start"
              asChild
            >
              <Link to={action.href}>
                <div className="bg-primary/10 rounded-full p-2">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
