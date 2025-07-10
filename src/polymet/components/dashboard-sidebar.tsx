import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChartIcon,
  BoxIcon,
  BuildingIcon,
  ClipboardListIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  PackageIcon,
  PieChartIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />

      <span>{label}</span>
    </Link>
  );
};

interface DashboardSidebarProps {
  activeItem?: string;
}

export default function DashboardSidebar({
  activeItem = "dashboard",
}: DashboardSidebarProps) {
  const sidebarItems = [
    {
      section: "Overview",
      items: [
        {
          icon: LayoutDashboardIcon,
          label: "Dashboard",
          href: "/dashboard",
          id: "dashboard",
        },
        {
          icon: BarChartIcon,
          label: "Analytics",
          href: "/dashboard/analytics",
          id: "analytics",
        },
        {
          icon: PieChartIcon,
          label: "Reports",
          href: "/dashboard/reports",
          id: "reports",
        },
      ],
    },
    {
      section: "Marketplace",
      items: [
        {
          icon: ShoppingCartIcon,
          label: "Orders",
          href: "/orders",
          id: "orders",
        },
        {
          icon: ClipboardListIcon,
          label: "RFQs",
          href: "/dashboard/rfqs",
          id: "rfqs",
        },
        {
          icon: PackageIcon,
          label: "Products",
          href: "/dashboard/products",
          id: "products",
        },
        {
          icon: BuildingIcon,
          label: "Suppliers",
          href: "/dashboard/suppliers",
          id: "suppliers",
        },
      ],
    },
    {
      section: "Management",
      items: [
        {
          icon: UsersIcon,
          label: "Users",
          href: "/dashboard/users",
          id: "users",
        },
        {
          icon: TruckIcon,
          label: "Logistics",
          href: "/dashboard/logistics",
          id: "logistics",
        },
        {
          icon: MessageSquareIcon,
          label: "Messages",
          href: "/messages",
          id: "messages",
        },
        {
          icon: SettingsIcon,
          label: "Settings",
          href: "/settings",
          id: "settings",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <HomeIcon className="h-5 w-5" />

          <span>Back to Marketplace</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        {sidebarItems.map((section, index) => (
          <div key={index} className="px-3 py-2">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={activeItem === item.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
