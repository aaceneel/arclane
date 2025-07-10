"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BellIcon,
  BuildingIcon,
  ChevronDownIcon,
  GlobeIcon,
  HelpCircleIcon,
  HomeIcon,
  LayoutIcon,
  ListIcon,
  MenuIcon,
  MessageSquareIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react";
import ArclaneLogo from "@/polymet/components/arclane-logo";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const mainCategories = [
    { name: "Industrial Supplies", path: "/category/industrial-supplies" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Machinery", path: "/category/machinery" },
    { name: "Raw Materials", path: "/category/raw-materials" },
    { name: "Packaging", path: "/category/packaging" },
    { name: "Office Supplies", path: "/category/office-supplies" },
  ];

  const userMenuItems = [
    { label: "My Account", icon: UserIcon, path: "/account" },
    { label: "Dashboard", icon: LayoutIcon, path: "/dashboard" },
    { label: "Orders", icon: ShoppingCartIcon, path: "/orders" },
    { label: "Messages", icon: MessageSquareIcon, path: "/messages" },
    { label: "Settings", icon: LayoutIcon, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar with language, help, etc. */}
      <div className="hidden border-b bg-background py-2 md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <GlobeIcon className="h-4 w-4" />

                  <span>English</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
                <DropdownMenuItem>中文</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-4 border-r border-border"></div>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <BuildingIcon className="h-4 w-4" />

              <span>Sell on Arclane</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="h-8">
              <HelpCircleIcon className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </Button>
            <div className="h-4 border-r border-border"></div>
            {loading ? (
              <div className="h-8 w-20 animate-pulse bg-muted rounded"></div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">Welcome, {user.email?.split('@')[0]}</span>
                <Button variant="ghost" size="sm" className="h-8" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="h-8" asChild>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" className="h-8" asChild>
                  <Link to="/sign-up">Join Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header with logo, search, and actions */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center lg:gap-10">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <MenuIcon className="h-5 w-5" />

                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ArclaneLogo />

                    <span>Arclane</span>
                  </Link>
                  <div className="grid gap-3">
                    {mainCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <div className="grid gap-3">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />

                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2 font-bold">
              <ArclaneLogo />

              <span className="hidden md:inline-block">Arclane</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    <ListIcon className="h-4 w-4" />

                    <span>Categories</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[240px]">
                  {mainCategories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link to={category.path}>{category.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/rfq" className="flex items-center text-sm font-medium">
                Request for Quotation
              </Link>
              <Link
                to="/ready-to-ship"
                className="flex items-center text-sm font-medium"
              >
                Ready to Ship
              </Link>
              <Link
                to="/trade-shows"
                className="flex items-center text-sm font-medium"
              >
                Trade Shows
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center gap-4">
            <form className="hidden flex-1 md:flex">
              <div className="relative flex flex-1 items-center">
                <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="search"
                  placeholder="Search products, suppliers..."
                  className="pl-9 rounded-r-none border-r-0"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0"
                  >
                    All Categories
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Categories</DropdownMenuItem>
                  {mainCategories.map((category) => (
                    <DropdownMenuItem key={category.name}>
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </form>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative md:hidden"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" />

                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Messages"
              >
                <MessageSquareIcon className="h-5 w-5" />

                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  5
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Cart"
              >
                <ShoppingCartIcon className="h-5 w-5" />

                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  2
                </Badge>
              </Button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full border-2"
                      aria-label="User menu"
                    >
                      <UserIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[240px]">
                    <DropdownMenuLabel>
                      <div>
                        <p className="font-medium">{user.user_metadata?.name || 'User'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {userMenuItems.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
                      <LogOutIcon className="h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="rounded-full border-2" asChild>
                  <Link to="/sign-in" aria-label="Sign in">
                    <UserIcon className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search (visible on small screens) */}
      <div className="border-b bg-background p-4 md:hidden">
        <form className="flex items-center gap-2">
          <div className="relative flex flex-1 items-center">
            <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search products, suppliers..."
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {/* Breadcrumb (optional) */}
      <div className="container flex items-center py-2 text-sm">
        <Link to="/" className="flex items-center gap-1 text-muted-foreground">
          <HomeIcon className="h-3 w-3" />

          <span>Home</span>
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 font-bold">
                <ArclaneLogo />

                <span>Arclane</span>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Global B2B marketplace connecting buyers and suppliers
                worldwide.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium">For Buyers</h3>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/post-buying-request">Post Buying Request</Link>
                </li>
                <li>
                  <Link to="/buyer-central">Buyer Central</Link>
                </li>
                <li>
                  <Link to="/payment-options">Payment Options</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium">For Suppliers</h3>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/supplier-membership">Supplier Membership</Link>
                </li>
                <li>
                  <Link to="/learning-center">Learning Center</Link>
                </li>
                <li>
                  <Link to="/service-marketplace">Service Marketplace</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium">About</h3>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Arclane B2B Marketplace. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
