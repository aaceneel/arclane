import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCartIcon, ArrowLeftIcon, ShieldIcon } from "lucide-react";
import CartItem from "@/polymet/components/cart-item";
import CartSummary from "@/polymet/components/cart-summary";
import RelatedProducts from "@/polymet/components/related-products";
import { PRODUCTS } from "@/polymet/data/product-data";

export default function CartPage() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: "item-1",
      title:
        "Industrial Safety Helmet with Integrated Face Shield - ANSI Certified",
      slug: "industrial-safety-helmet",
      image: "https://picsum.photos/seed/helmet1/200/200",
      price: 24.99,
      currency: "USD",
      quantity: 50,
      minOrder: 10,
      variant: "White, Standard Size",
      supplier: {
        id: "sup-1",
        name: "SafetyFirst Equipment",
      },
      inStock: true,
    },
    {
      id: "item-2",
      title: "Custom PCB Manufacturing Service - 2 Layer FR4 Circuit Board",
      slug: "pcb-manufacturing-service",
      image: "https://picsum.photos/seed/pcb1/200/200",
      price: 2.5,
      currency: "USD",
      quantity: 100,
      minOrder: 50,
      variant: "2 Layer, Green Solder Mask",
      supplier: {
        id: "sup-2",
        name: "TechPro Industries",
      },
      inStock: true,
    },
    {
      id: "item-3",
      title: "Aluminum Alloy 6061-T6 Sheets - Custom Cut Sizes",
      slug: "aluminum-alloy-sheets",
      image: "https://picsum.photos/seed/aluminum1/200/200",
      price: 3.5,
      currency: "USD",
      quantity: 200,
      minOrder: 100,
      variant: "1.5mm Thickness, Mill Finish",
      supplier: {
        id: "sup-3",
        name: "Global Materials Co.",
      },
      inStock: true,
    },
  ]);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 45;
  const tax = subtotal * 0.08;
  const discount = 50;
  const total = subtotal + shipping + tax - discount;

  // Handle quantity updates
  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Handle save for later
  const handleSaveForLater = (id) => {
    console.log(`Item ${id} saved for later`);
    // In a real app, this would move the item to a saved items list
    handleRemoveItem(id);
  };

  // Handle coupon application
  const handleApplyCoupon = (code) => {
    console.log(`Coupon ${code} applied`);
    // In a real app, this would validate the coupon and update the discount
  };

  // Handle checkout
  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // In a real app, this would navigate to the checkout page
  };

  // Get related products from product data
  const relatedProducts = PRODUCTS.slice(0, 5).map((product) => ({
    id: product.id,
    title: product.title,
    slug: product.slug,
    image: product.images[0],
    price: {
      min: product.price.min,
      max: product.price.max,
    },
    currency: product.currency,
    minOrder: product.minOrder,
    rating: product.rating,
    reviewCount: product.reviewCount,
    supplier: {
      name: product.supplier.name,
      country: product.supplier.country,
      verificationLevel: product.supplier.verificationLevel,
      responseRate: product.supplier.responseRate,
    },
    featured: product.featured,
  }));

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        {/* Page header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Cart ({cartItems.length} items)
                    </h2>
                    <Link
                      to="/"
                      className="flex items-center text-sm text-primary"
                    >
                      <ArrowLeftIcon className="mr-1 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </div>
                  <Separator className="my-4" />

                  <div className="space-y-1">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        onSaveForLater={handleSaveForLater}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                currency="USD"
                itemCount={cartItems.length}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckout}
              />

              {/* Secure checkout message */}
              <div className="mt-6 rounded-lg border bg-card p-4">
                <div className="flex items-center space-x-2">
                  <ShieldIcon className="h-5 w-5 text-muted-foreground" />

                  <h3 className="font-medium">Secure Checkout</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your payment information is processed securely. We do not
                  store credit card details nor have access to your credit card
                  information.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-16">
            <ShoppingCartIcon className="h-16 w-16 text-muted-foreground/60" />

            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 max-w-md text-center text-muted-foreground">
              Looks like you haven't added any products to your cart yet. Browse
              our catalog to find what you need for your business.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/">Browse Products</Link>
            </Button>
          </div>
        )}

        {/* Related products */}
        <div className="mt-8">
          <RelatedProducts
            title="You might also be interested in"
            products={relatedProducts}
            viewAllLink="/category/industrial-supplies"
          />
        </div>
      </div>
    </div>
  );
}
