import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeartIcon, TrashIcon } from "lucide-react";

export default function CartItem({
  id,
  title,
  slug,
  image,
  price,
  currency = "USD",
  quantity,
  minOrder,
  variant,
  supplier,
  inStock = true,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
}) {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < minOrder) return;

    setItemQuantity(newQuantity);
    if (onUpdateQuantity) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleSaveForLater = () => {
    if (onSaveForLater) {
      onSaveForLater(id);
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const subtotal = price * itemQuantity;

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product image */}
        <div className="flex-shrink-0">
          <Link to={`/product/${slug}`}>
            <img
              src={image}
              alt={title}
              className="w-24 h-24 object-cover rounded-md border"
            />
          </Link>
        </div>

        {/* Product details */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <Link
              to={`/product/${slug}`}
              className="font-medium hover:underline line-clamp-2"
            >
              {title}
            </Link>
            <div className="text-right mt-1 sm:mt-0">
              <div className="font-medium">{formatPrice(price)}</div>
            </div>
          </div>

          {variant && (
            <div className="text-sm text-muted-foreground">
              Variant: {variant}
            </div>
          )}

          <div className="text-sm">
            <Link
              to={`/supplier/${supplier.id}`}
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              {supplier.name}
            </Link>
          </div>

          <div className="flex items-center text-sm">
            <span className={inStock ? "text-green-600" : "text-red-600"}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
            {inStock && (
              <span className="text-muted-foreground ml-2">
                (Min. Order: {minOrder})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <div className="flex items-center gap-2">
              <label htmlFor={`quantity-${id}`} className="text-sm">
                Qty:
              </label>
              <Input
                id={`quantity-${id}`}
                type="number"
                min={minOrder}
                value={itemQuantity}
                onChange={handleQuantityChange}
                className="w-20 h-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveForLater}>
                <HeartIcon className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleRemove}>
                <TrashIcon className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <div className="text-sm font-medium">
          Subtotal: <span className="text-base">{formatPrice(subtotal)}</span>
        </div>
      </div>

      <Separator className="mt-6" />
    </div>
  );
}
