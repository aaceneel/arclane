import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, ShieldIcon } from "lucide-react";

export default function CartSummary({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  currency = "USD",
  itemCount = 0,
  onApplyCoupon,
  onCheckout,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);

  const total = subtotal + shipping + tax - discount;

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);

    // Simulate API call
    setTimeout(() => {
      setCouponLoading(false);
      setCouponApplied(true);

      if (onApplyCoupon) {
        onApplyCoupon(couponCode);
      }
    }, 1000);
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal ({itemCount} items)
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {shipping > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {/* Coupon code */}
        <div className="pt-4">
          <Label htmlFor="coupon-code">Coupon Code</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              id="coupon-code"
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={couponApplied || couponLoading}
            />

            <Button
              variant={couponApplied ? "outline" : "secondary"}
              disabled={!couponCode.trim() || couponApplied || couponLoading}
              onClick={handleApplyCoupon}
              className="whitespace-nowrap"
            >
              {couponLoading ? (
                "Applying..."
              ) : couponApplied ? (
                <>
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Applied
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
          {couponApplied && (
            <p className="text-xs text-green-600 mt-1">
              Coupon "{couponCode}" applied successfully!
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full"
          size="lg"
          disabled={itemCount === 0}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>

        <div className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground">
          <ShieldIcon className="h-3 w-3" />

          <span>Secure checkout</span>
        </div>

        <div className="mt-4 text-center text-sm">
          <p className="text-muted-foreground">
            Need help?{" "}
            <Link to="/help" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
