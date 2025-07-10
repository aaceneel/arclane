import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  BellIcon,
  BuildingIcon,
  ChevronRightIcon,
  HomeIcon,
  UserIcon,
} from "lucide-react";

import AccountSidebar from "@/polymet/components/account-sidebar";
import AccountOverviewCard from "@/polymet/components/account-overview-card";
import AccountActivityCard from "@/polymet/components/account-activity-card";
import AccountQuickActions from "@/polymet/components/account-quick-actions";
import Breadcrumb from "@/polymet/components/breadcrumb";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user: authUser, loading: authLoading, signOut } = useAuth();

  // Mock user data (in a real app, you'd get this from the authenticated user)
  const user = {
    name: authUser?.user_metadata?.name || "John Smith",
    email: authUser?.email || "john.smith@acmecorp.com",
    avatar: "https://github.com/yusufhilmi.png",
    company: authUser?.user_metadata?.company || "Acme Corporation",
    memberSince: "Jan 2023",
    verificationLevel: "gold" as const,
    completionPercentage: 85,
  };

  const stats = {
    totalOrders: 24,
    pendingOrders: 3,
    totalRfqs: 12,
    activeRfqs: 2,
    savedItems: 8,
  };

  const activities = [
    {
      id: "act-1",
      type: "order",
      title: "Order #38291 - Industrial Safety Equipment",
      date: "Today, 10:23 AM",
      status: "processing",
      details: "Your order has been confirmed and is being processed",
    },
    {
      id: "act-2",
      type: "message",
      title: "New message from TechPro Industries",
      date: "Yesterday",
      status: "new",
      details: "RE: Inquiry about custom manufacturing options",
    },
    {
      id: "act-3",
      type: "rfq",
      title: "RFQ #12453 - Custom Electronic Components",
      date: "Jul 15, 2023",
      status: "pending",
      details: "Waiting for 2 more supplier quotes",
    },
    {
      id: "act-4",
      type: "invoice",
      title: "Invoice #INV-2023-0042 paid",
      date: "Jul 12, 2023",
      status: "completed",
    },
  ];

  const breadcrumbItems = [{ label: "Account Dashboard" }];

  return (
    <div className="container py-6">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <div className="md:hidden">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="hidden md:block">
          <AccountSidebar />
        </div>

        <div className="flex-1">
          <div
            className={activeTab === "overview" ? "block" : "hidden md:block"}
          >
            <h1 className="text-2xl font-bold mb-6">Account Dashboard</h1>

            <div className="grid gap-6">
              <AccountOverviewCard user={user} stats={stats} />

              <div className="grid md:grid-cols-2 gap-6">
                <AccountQuickActions />

                <AccountActivityCard activities={activities} />
              </div>
            </div>
          </div>

          <div className={activeTab === "settings" ? "block" : "hidden"}>
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Job Position</Label>
                    <Input id="position" placeholder="Enter job position" />
                  </div>
                </div>
                <Button className="mt-2">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" defaultValue={user.company} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="Select industry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter company address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <Button className="mt-2">Save Changes</Button>
              </CardContent>
            </Card>
          </div>

          <div className={activeTab === "notifications" ? "block" : "hidden"}>
            <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>

            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your order status changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">RFQ Responses</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when suppliers respond to your RFQs
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for new messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing & Promotions</p>
                      <p className="text-sm text-muted-foreground">
                        Receive special offers and product recommendations
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
