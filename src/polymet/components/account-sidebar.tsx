import { Link, useLocation } from "react-router-dom";
import {
  BuildingIcon,
  CreditCardIcon,
  FileTextIcon,
  HeartIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
} from "lucide-react";

const navigationItems = [
  {
    title: "Account",
    items: [
      {
        name: "Dashboard",
        href: "/account",
        icon: LayoutDashboardIcon,
      },
      {
        name: "Profile",
        href: "/account/profile",
        icon: UserIcon,
      },
      {
        name: "Company Information",
        href: "/account/company",
        icon: BuildingIcon,
      },
      {
        name: "Settings",
        href: "/account/settings",
        icon: SettingsIcon,
      },
    ],
  },
  {
    title: "Orders & Purchases",
    items: [
      {
        name: "Orders",
        href: "/orders",
        icon: ShoppingCartIcon,
      },
      {
        name: "Shipments",
        href: "/account/shipments",
        icon: TruckIcon,
      },
      {
        name: "Invoices",
        href: "/account/invoices",
        icon: FileTextIcon,
      },
      {
        name: "Payment Methods",
        href: "/account/payment",
        icon: CreditCardIcon,
      },
    ],
  },
  {
    title: "Interactions",
    items: [
      {
        name: "Saved Items",
        href: "/account/saved",
        icon: HeartIcon,
      },
      {
        name: "Messages",
        href: "/messages",
        icon: MessageSquareIcon,
        badge: 3,
      },
      {
        name: "RFQs",
        href: "/account/rfqs",
        icon: PackageIcon,
      },
    ],
  },
];

export default function AccountSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-full md:w-64 md:flex-shrink-0 border-r">
      <div className="p-4 md:p-6">
        <div className="space-y-6">
          {navigationItems.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {section.title}
              </h3>
              <nav className="flex flex-col space-y-1">
                {section.items.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="mr-3 h-4 w-4" />

                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
