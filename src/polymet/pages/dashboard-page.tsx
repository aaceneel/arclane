import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChartIcon,
  BellIcon,
  ClipboardListIcon,
  DollarSignIcon,
  DownloadIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  PackageIcon,
  RefreshCwIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";

import DashboardSidebar from "@/polymet/components/dashboard-sidebar";
import DashboardMetricCard from "@/polymet/components/dashboard-metric-card";
import DashboardChart from "@/polymet/components/dashboard-chart";
import DashboardRecentOrders from "@/polymet/components/dashboard-recent-orders";
import DashboardTopProducts from "@/polymet/components/dashboard-top-products";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for metrics
  const metricsData = {
    orders: {
      value: "124",
      change: { value: 8, trend: "up" },
      sparklineData: [
        { value: 85 },
        { value: 92 },
        { value: 89 },
        { value: 95 },
        { value: 110 },
        { value: 102 },
        { value: 124 },
      ],
    },
    revenue: {
      value: "$24,780",
      change: { value: 12, trend: "up" },
      sparklineData: [
        { value: 18500 },
        { value: 19200 },
        { value: 18900 },
        { value: 20100 },
        { value: 22400 },
        { value: 23100 },
        { value: 24780 },
      ],
    },
    rfqs: {
      value: "32",
      change: { value: 5, trend: "down" },
      sparklineData: [
        { value: 42 },
        { value: 38 },
        { value: 40 },
        { value: 35 },
        { value: 38 },
        { value: 34 },
        { value: 32 },
      ],
    },
    suppliers: {
      value: "87",
      change: { value: 3, trend: "up" },
      sparklineData: [
        { value: 75 },
        { value: 78 },
        { value: 80 },
        { value: 82 },
        { value: 84 },
        { value: 85 },
        { value: 87 },
      ],
    },
  };

  // Mock data for sales chart
  const salesData = [
    { month: "Jan", orders: 65, revenue: 4200 },
    { month: "Feb", orders: 59, revenue: 3800 },
    { month: "Mar", orders: 80, revenue: 5100 },
    { month: "Apr", orders: 81, revenue: 5400 },
    { month: "May", orders: 56, revenue: 3700 },
    { month: "Jun", orders: 55, revenue: 3600 },
    { month: "Jul", orders: 40, revenue: 2800 },
  ];

  // Mock data for category chart
  const categoryData = [
    { category: "Electronics", sales: 4200 },
    { category: "Industrial", sales: 3800 },
    { category: "Machinery", sales: 3100 },
    { category: "Raw Materials", sales: 2700 },
    { category: "Packaging", sales: 2200 },
    { category: "Office Supplies", sales: 1800 },
  ];

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ord-001",
      orderNumber: "ORD-38291",
      customer: {
        name: "John Smith",
        avatar: "https://github.com/yusufhilmi.png",
        company: "Acme Corporation",
      },
      date: "Today, 10:23 AM",
      amount: "$1,245.00",
      status: "processing",
    },
    {
      id: "ord-002",
      orderNumber: "ORD-38290",
      customer: {
        name: "Sarah Johnson",
        avatar: "https://github.com/furkanksl.png",
        company: "Tech Innovations Ltd.",
      },
      date: "Yesterday",
      amount: "$3,780.50",
      status: "shipped",
    },
    {
      id: "ord-003",
      orderNumber: "ORD-38289",
      customer: {
        name: "Michael Chen",
        avatar: "https://github.com/kdrnp.png",
        company: "Global Supplies Inc.",
      },
      date: "Jul 15, 2023",
      amount: "$950.25",
      status: "delivered",
    },
    {
      id: "ord-004",
      orderNumber: "ORD-38288",
      customer: {
        name: "Emma Davis",
        avatar: "https://github.com/yahyabedirhan.png",
        company: "Davis Manufacturing",
      },
      date: "Jul 14, 2023",
      amount: "$2,340.00",
      status: "cancelled",
    },
  ];

  // Mock data for top products
  const topProducts = [
    {
      id: "prod-001",
      name: "Industrial Safety Helmet",
      category: "Safety Equipment",
      sales: 245,
      percentage: 100,
      trend: "up",
      trendValue: 12,
    },
    {
      id: "prod-002",
      name: "PCB Manufacturing Service",
      category: "Electronics",
      sales: 198,
      percentage: 81,
      trend: "up",
      trendValue: 8,
    },
    {
      id: "prod-003",
      name: "Aluminum Alloy Sheets",
      category: "Raw Materials",
      sales: 176,
      percentage: 72,
      trend: "down",
      trendValue: 5,
    },
    {
      id: "prod-004",
      name: "Packaging Machine",
      category: "Machinery",
      sales: 154,
      percentage: 63,
      trend: "neutral",
      trendValue: 0,
    },
    {
      id: "prod-005",
      name: "Corrugated Shipping Boxes",
      category: "Packaging",
      sales: 132,
      percentage: 54,
      trend: "up",
      trendValue: 15,
    },
  ];

  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "12m", label: "Last 12 months" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Dashboard sidebar */}
      <DashboardSidebar activeItem="dashboard" />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-2">
              <LayoutDashboardIcon className="h-5 w-5" />

              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCwIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <DownloadIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />

                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/yusufhilmi.png" />

                <AvatarFallback>YH</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 overflow-hidden"
        >
          <div className="border-b bg-background px-6">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="overview"
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardMetricCard
                title="Total Orders"
                value={metricsData.orders.value}
                icon={<ShoppingCartIcon className="h-4 w-4" />}
                change={metricsData.orders.change}
                sparklineData={metricsData.orders.sparklineData}
                helpText="Total number of orders placed in the current month"
              />

              <DashboardMetricCard
                title="Monthly Revenue"
                value={metricsData.revenue.value}
                icon={<DollarSignIcon className="h-4 w-4" />}
                change={metricsData.revenue.change}
                sparklineData={metricsData.revenue.sparklineData}
                helpText="Total revenue generated in the current month"
              />

              <DashboardMetricCard
                title="Active RFQs"
                value={metricsData.rfqs.value}
                icon={<ClipboardListIcon className="h-4 w-4" />}
                change={metricsData.rfqs.change}
                sparklineData={metricsData.rfqs.sparklineData}
                helpText="Number of Request for Quotations currently active"
              />

              <DashboardMetricCard
                title="Total Suppliers"
                value={metricsData.suppliers.value}
                icon={<UsersIcon className="h-4 w-4" />}
                change={metricsData.suppliers.change}
                sparklineData={metricsData.suppliers.sparklineData}
                helpText="Total number of suppliers in your network"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardChart
                title="Sales Performance"
                description="Monthly orders and revenue"
                type="line"
                data={salesData}
                dataKeys={{
                  xAxis: "month",
                  series: [
                    {
                      name: "Orders",
                      key: "orders",
                      color: "hsl(var(--chart-1))",
                    },
                    {
                      name: "Revenue",
                      key: "revenue",
                      color: "hsl(var(--chart-2))",
                    },
                  ],
                }}
                timeRanges={timeRanges}
              />

              <DashboardChart
                title="Sales by Category"
                description="Distribution of sales across product categories"
                type="bar"
                data={categoryData}
                dataKeys={{
                  xAxis: "category",
                  series: [
                    {
                      name: "Sales",
                      key: "sales",
                      color: "hsl(var(--chart-3))",
                    },
                  ],
                }}
              />
            </div>

            {/* Recent orders and top products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DashboardRecentOrders
                orders={recentOrders}
                className="lg:col-span-2"
              />

              <DashboardTopProducts
                products={topProducts}
                maxSales={245}
                className="lg:col-span-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="p-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <BarChartIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />

                    <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Detailed analytics and reporting will be available here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="p-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <FileTextIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />

                    <h3 className="text-lg font-medium">Reports Dashboard</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Generate and download custom reports here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="p-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <BellIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />

                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      View and manage your notifications here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
