"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ChevronDownIcon, FilterIcon, StarIcon } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
}

export interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
  expanded?: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface ProductFilterProps {
  categories: FilterGroup;
  suppliers: FilterGroup;
  certifications: FilterGroup;
  priceRange: PriceRange;
  minOrderRange: {
    min: number;
    max: number;
  };
  onFilterChange?: (filters: any) => void;
}

export default function ProductFilter({
  categories,
  suppliers,
  certifications,
  priceRange,
  minOrderRange,
  onFilterChange,
}: ProductFilterProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      categories: true,
      suppliers: true,
      certifications: true,
      rating: true,
      price: true,
      minOrder: true,
    }
  );

  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([
    priceRange.min,
    priceRange.max,
  ]);

  const [selectedMinOrder, setSelectedMinOrder] = useState<number>(
    minOrderRange.min
  );

  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: priceRange.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleClearFilters = () => {
    // Implementation for clearing filters would go here
    console.log("Clearing filters");
  };

  const FilterSection = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-4">
      {children}
      <Separator />
    </div>
  );

  const FilterGroupComponent = ({
    group,
    groupId,
  }: {
    group: FilterGroup;
    groupId: string;
  }) => (
    <Collapsible
      open={expandedGroups[groupId]}
      onOpenChange={() => toggleGroup(groupId)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{group.name}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                expandedGroups[groupId] ? "transform rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2">
        <div className="space-y-2">
          {group.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox id={option.id} checked={option.checked} />

              <Label
                htmlFor={option.id}
                className="flex-1 text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
              {option.count !== undefined && (
                <span className="text-xs text-muted-foreground">
                  ({option.count})
                </span>
              )}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  const MobileFilter = () => (
    <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Narrow down products by applying filters
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {DesktopFilter()}
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Clear Filters
          </Button>
          <Button size="sm" onClick={() => setIsFiltersOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  const DesktopFilter = () => (
    <>
      <FilterSection>
        <FilterGroupComponent group={categories} groupId="categories" />
      </FilterSection>

      <FilterSection>
        <Collapsible
          open={expandedGroups.price}
          onOpenChange={() => toggleGroup("price")}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Price Range</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    expandedGroups.price ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4">
              <Slider
                defaultValue={[priceRange.min, priceRange.max]}
                min={priceRange.min}
                max={priceRange.max}
                step={(priceRange.max - priceRange.min) / 100}
                value={selectedPrice}
                onValueChange={(value) =>
                  setSelectedPrice(value as [number, number])
                }
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={selectedPrice[0]}
                    onChange={(e) =>
                      setSelectedPrice([
                        Number(e.target.value),
                        selectedPrice[1],
                      ])
                    }
                    className="w-24 h-8"
                  />
                </div>
                <span className="text-sm text-muted-foreground">to</span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={selectedPrice[1]}
                    onChange={(e) =>
                      setSelectedPrice([
                        selectedPrice[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-24 h-8"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </FilterSection>

      <FilterSection>
        <Collapsible
          open={expandedGroups.minOrder}
          onOpenChange={() => toggleGroup("minOrder")}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Min. Order</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    expandedGroups.minOrder ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4">
              <Slider
                defaultValue={[minOrderRange.min]}
                min={minOrderRange.min}
                max={minOrderRange.max}
                step={1}
                value={[selectedMinOrder]}
                onValueChange={(value) => setSelectedMinOrder(value[0])}
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Min. Order:{" "}
                  <span className="font-medium">{selectedMinOrder} units</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </FilterSection>

      <FilterSection>
        <FilterGroupComponent group={suppliers} groupId="suppliers" />
      </FilterSection>

      <FilterSection>
        <FilterGroupComponent group={certifications} groupId="certifications" />
      </FilterSection>

      <FilterSection>
        <Collapsible
          open={expandedGroups.rating}
          onOpenChange={() => toggleGroup("rating")}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Rating</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    expandedGroups.rating ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-2">
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() =>
                    setSelectedRating(selectedRating === rating ? null : rating)
                  }
                >
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating === rating}
                  />

                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center space-x-1 cursor-pointer"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </FilterSection>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={handleClearFilters}
      >
        Clear All Filters
      </Button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <MobileFilter />
      </div>
      <div className="hidden lg:block space-y-6">{DesktopFilter()}</div>
    </div>
  );
}
