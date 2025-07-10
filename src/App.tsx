import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketplaceLayout from "@/polymet/layouts/marketplace-layout";
import HomePage from "@/polymet/pages/home-page";
import ProductDetailPage from "@/polymet/pages/product-detail-page";
import CategoryListingPage from "@/polymet/pages/category-listing-page";
import SupplierProfilePage from "@/polymet/pages/supplier-profile-page";
import RfqPage from "@/polymet/pages/rfq-page";
import ReadyToShipPage from "@/polymet/pages/ready-to-ship-page";
import OrdersPage from "@/polymet/pages/orders-page";
import AccountPage from "@/polymet/pages/account-page";
import DashboardPage from "@/polymet/pages/dashboard-page";
import DashboardMessagesPage from "@/polymet/pages/dashboard-messages-page";
import CartPage from "@/polymet/pages/cart-page";
import MessagesPage from "@/polymet/pages/messages-page";
import SupabaseTestPage from "@/polymet/pages/supabase-test-page";
import SignInPage from "@/polymet/pages/sign-in-page";
import SignUpPage from "@/polymet/pages/sign-up-page";
import { AuthProvider } from "@/contexts/AuthContext";

export default function MarketplacePrototype() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MarketplaceLayout>
                <HomePage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/product/:slug"
            element={
              <MarketplaceLayout>
                <ProductDetailPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/category/:categoryId"
            element={
              <MarketplaceLayout>
                <CategoryListingPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/supplier/:supplierId"
            element={
              <MarketplaceLayout>
                <SupplierProfilePage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/rfq"
            element={
              <MarketplaceLayout>
                <RfqPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/ready-to-ship"
            element={
              <MarketplaceLayout>
                <ReadyToShipPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/orders"
            element={
              <MarketplaceLayout>
                <OrdersPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/account"
            element={
              <MarketplaceLayout>
                <AccountPage />
              </MarketplaceLayout>
            }
          />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/dashboard/messages" element={<DashboardMessagesPage />} />

          <Route
            path="/cart"
            element={
              <MarketplaceLayout>
                <CartPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/messages"
            element={
              <MarketplaceLayout>
                <MessagesPage />
              </MarketplaceLayout>
            }
          />

          <Route
            path="/supabase-test"
            element={
              <MarketplaceLayout>
                <SupabaseTestPage />
              </MarketplaceLayout>
            }
          />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
