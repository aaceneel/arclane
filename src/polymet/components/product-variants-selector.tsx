"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  minOrder: number;
  stock: number;
  attributes: {
    [key: string]: string;
  };
}

export interface ProductVariantsSelectorProps {
  variants: ProductVariant[];
  currency: string;
  onVariantChange?: (variant: ProductVariant) => void;
  onQuantityChange?: (quantity: number) => void;
  onAddToCart?: (variant: ProductVariant, quantity: number) => void;
}

export default function ProductVariantsSelector({
  variants,
  currency,
  onVariantChange,
  onQuantityChange,
  onAddToCart,
}: ProductVariantsSelectorProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState<number>(variants[0]?.minOrder || 1);

  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  const attributeKeys = selectedVariant
    ? Object.keys(selectedVariant.attributes)
    : [];

  // Get unique attribute values for each attribute key
  const attributeOptions: Record<string, string[]> = {};
  attributeKeys.forEach((key) => {
    attributeOptions[key] = Array.from(
      new Set(variants.map((variant) => variant.attributes[key]))
    );
  });

  const handleVariantChange = (variantId: string) => {
    const variant = variants.find((v) => v.id === variantId);
    if (variant) {
      setSelectedVariantId(variantId);
      setQuantity(variant.minOrder);
      if (onVariantChange) {
        onVariantChange(variant);
      }
      if (onQuantityChange) {
        onQuantityChange(variant.minOrder);
      }
    }
  };

  const handleAttributeChange = (attributeKey: string, value: string) => {
    // Find a variant that matches the selected attributes
    const currentAttributes = { ...selectedVariant?.attributes };
    currentAttributes[attributeKey] = value;

    // Find the first variant that matches all selected attributes
    const matchingVariant = variants.find((variant) => {
      return Object.entries(currentAttributes).every(
        ([key, val]) => variant.attributes[key] === val
      );
    });

    if (matchingVariant) {
      handleVariantChange(matchingVariant.id);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (selectedVariant && newQuantity >= selectedVariant.minOrder) {
      setQuantity(newQuantity);
      if (onQuantityChange) {
        onQuantityChange(newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedVariant && onAddToCart) {
      onAddToCart(selectedVariant, quantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (!selectedVariant) {
    return <div>No variants available</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold">
              {formatPrice(selectedVariant.price)}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            )}
          </div>
          <Badge variant="outline" className="font-normal">
            SKU: {selectedVariant.sku}
          </Badge>
        </div>
        <div className="flex items-center text-sm">
          <span
            className={
              selectedVariant.stock > 0 ? "text-green-600" : "text-red-600"
            }
          >
            {selectedVariant.stock > 0
              ? `In stock (${selectedVariant.stock} available)`
              : "Out of stock"}
          </span>
        </div>
      </div>

      <Separator />

      {attributeKeys.length > 0 && (
        <div className="space-y-4">
          {attributeKeys.map((key) => (
            <div key={key}>
              <Label className="mb-2 block capitalize">{key}</Label>
              <div className="flex flex-wrap gap-2">
                {attributeOptions[key].map((value) => (
                  <Badge
                    key={value}
                    variant={
                      selectedVariant.attributes[key] === value
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleAttributeChange(key, value)}
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="variant-select">Select Option</Label>
        <Select value={selectedVariantId} onValueChange={handleVariantChange}>
          <SelectTrigger id="variant-select">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            {variants.map((variant) => (
              <SelectItem key={variant.id} value={variant.id}>
                {variant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= selectedVariant.minOrder}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <Input
            id="quantity"
            type="number"
            className="mx-2 text-center"
            value={quantity}
            min={selectedVariant.minOrder}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
          />

          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Minimum order: {selectedVariant.minOrder} units
        </p>
      </div>

      <div className="pt-2">
        <Button className="w-full" size="lg" onClick={handleAddToCart}>
          <ShoppingCartIcon className="mr-2 h-5 w-5" />
          Add to Inquiry
        </Button>
      </div>
    </div>
  );
}
