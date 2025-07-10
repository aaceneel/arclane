import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClipboardIcon,
  DownloadIcon,
  FileTextIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PackageIcon,
  SearchIcon,
  TruckIcon,
} from "lucide-react";
import Pagination from "@/polymet/components/pagination";

// Mock order data
const orders = [
  {
    id: "ORD-2023-8761",
    date: "2023-11-15",
    supplier: "TechPro Industries",
    total: 12499.99,
    status: "delivered",
    paymentStatus: "paid",
    items: 5,
    trackingNumber: "TRK928374651",
  },
  {
    id: "ORD-2023-8745",
    date: "2023-11-10",
    supplier: "Global Materials Co.",
    total: 3750.5,
    status: "shipped",
    paymentStatus: "paid",
    items: 2,
    trackingNumber: "TRK837465192",
  },
  {
    id: "ORD-2023-8732",
    date: "2023-11-05",
    supplier: "SafetyFirst Equipment",
    total: 899.95,
    status: "processing",
    paymentStatus: "paid",
    items: 3,
    trackingNumber: null,
  },
  {
    id: "ORD-2023-8721",
    date: "2023-10-28",
    supplier: "PackMaster Solutions",
    total: 1250.0,
    status: "delivered",
    paymentStatus: "paid",
    items: 1,
    trackingNumber: "TRK736451928",
  },
  {
    id: "ORD-2023-8715",
    date: "2023-10-22",
    supplier: "MachineWorks Ltd.",
    total: 28750.0,
    status: "delivered",
    paymentStatus: "paid",
    items: 1,
    trackingNumber: "TRK645192837",
  },
  {
    id: "ORD-2023-8702",
    date: "2023-10-15",
    supplier: "TechPro Industries",
    total: 5499.99,
    status: "cancelled",
    paymentStatus: "refunded",
    items: 4,
    trackingNumber: null,
  },
  {
    id: "ORD-2023-8695",
    date: "2023-10-10",
    supplier: "Global Materials Co.",
    total: 2100.75,
    status: "delivered",
    paymentStatus: "paid",
    items: 3,
    trackingNumber: "TRK192837465",
  },
  {
    id: "ORD-2023-8689",
    date: "2023-10-05",
    supplier: "PackMaster Solutions",
    total: 450.25,
    status: "delivered",
    paymentStatus: "paid",
    items: 2,
    trackingNumber: "TRK918273645",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "processing":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1.5"></div>
          Processing
        </Badge>
      );

    case "shipped":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200"
        >
          <TruckIcon className="h-3 w-3 mr-1" />
          Shipped
        </Badge>
      );

    case "delivered":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Delivered
        </Badge>
      );

    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></div>
          Cancelled
        </Badge>
      );

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPaymentStatusBadge = (status) => {
  switch (status) {
    case "paid":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Paid
        </Badge>
      );

    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200"
        >
          Pending
        </Badge>
      );

    case "refunded":
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-700 border-purple-200"
        >
          Refunded
        </Badge>
      );

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort orders based on sort config
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Calculate order statistics
  const totalOrders = orders.length;
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;
  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your orders from all suppliers
          </p>
        </div>

        {/* Order Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ClipboardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processingOrders}</div>
              <p className="text-xs text-muted-foreground">
                Orders being processed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shippedOrders}</div>
              <p className="text-xs text-muted-foreground">Orders in transit</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <BoxIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredOrders}</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order Management */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-[200px] md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <FilterIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Filter by Status</p>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => requestSort("id")}
                          >
                            Order ID
                            {sortConfig.key === "id" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUpIcon className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead>
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => requestSort("date")}
                          >
                            Date
                            {sortConfig.key === "date" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUpIcon className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead className="text-right">
                          <div
                            className="flex items-center justify-end cursor-pointer"
                            onClick={() => requestSort("total")}
                          >
                            Total
                            {sortConfig.key === "total" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUpIcon className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders.length > 0 ? (
                        currentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              <Link
                                to={`/order/${order.id}`}
                                className="hover:underline text-blue-600"
                              >
                                {order.id}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />

                                {new Date(order.date).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>{order.supplier}</TableCell>
                            <TableCell className="text-right font-medium">
                              $
                              {order.total.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell>
                              {getPaymentStatusBadge(order.paymentStatus)}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontalIcon className="h-4 w-4" />

                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <FileTextIcon className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <DownloadIcon className="mr-2 h-4 w-4" />
                                    Download Invoice
                                  </DropdownMenuItem>
                                  {order.status === "shipped" && (
                                    <DropdownMenuItem>
                                      <TruckIcon className="mr-2 h-4 w-4" />
                                      Track Shipment
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <PackageIcon className="h-12 w-12 mb-2" />

                              <h3 className="text-lg font-medium">
                                No orders found
                              </h3>
                              <p className="text-sm">
                                {searchQuery
                                  ? "Try adjusting your search or filter criteria"
                                  : "You haven't placed any orders yet"}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {filteredOrders.length > 0 && (
                  <div className="p-4 border-t">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(
                        filteredOrders.length / itemsPerPage
                      )}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      onItemsPerPageChange={setItemsPerPage}
                      itemsPerPageOptions={[5, 10, 25, 50]}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row justify-between gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/order/${order.id}`}
                            className="font-medium hover:underline text-blue-600"
                          >
                            {order.id}
                          </Link>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.supplier} •{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                          {order.items} {order.items === 1 ? "item" : "items"} •
                          $
                          {order.total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        {order.status === "shipped" && (
                          <Button variant="outline" size="sm">
                            <TruckIcon className="mr-2 h-4 w-4" />
                            Track
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="mt-0">
            <Card>
              <CardContent className="p-4">
                {orders.filter((order) => order.status === "processing")
                  .length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {orders
                      .filter((order) => order.status === "processing")
                      .map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row justify-between gap-4 p-4 border rounded-lg"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/order/${order.id}`}
                                className="font-medium hover:underline text-blue-600"
                              >
                                {order.id}
                              </Link>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.supplier} •{" "}
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm">
                              {order.items}{" "}
                              {order.items === 1 ? "item" : "items"} • $
                              {order.total.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <Button variant="outline" size="sm">
                              <FileTextIcon className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <PackageIcon className="h-12 w-12 mb-2" />

                    <h3 className="text-lg font-medium">
                      No processing orders
                    </h3>
                    <p className="text-sm">
                      You don't have any orders currently being processed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipped" className="mt-0">
            <Card>
              <CardContent className="p-4">
                {orders.filter((order) => order.status === "shipped").length >
                0 ? (
                  <div className="flex flex-col gap-4">
                    {orders
                      .filter((order) => order.status === "shipped")
                      .map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row justify-between gap-4 p-4 border rounded-lg"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/order/${order.id}`}
                                className="font-medium hover:underline text-blue-600"
                              >
                                {order.id}
                              </Link>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.supplier} •{" "}
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm">
                              Tracking:{" "}
                              <span className="font-medium">
                                {order.trackingNumber}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <Button variant="outline" size="sm">
                              <FileTextIcon className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <TruckIcon className="mr-2 h-4 w-4" />
                              Track
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <TruckIcon className="h-12 w-12 mb-2" />

                    <h3 className="text-lg font-medium">No shipped orders</h3>
                    <p className="text-sm">
                      You don't have any orders currently in transit
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
