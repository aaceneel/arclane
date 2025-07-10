"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from "lucide-react";

export interface ProductDetailGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductDetailGallery({
  images,
  productName,
}: ProductDetailGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <img
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-80"
            onClick={handlePrevious}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-80"
            onClick={handleNext}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-3 right-3 h-8 w-8 rounded-full opacity-80"
        >
          <ZoomInIcon className="h-4 w-4" />
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-1/5 pl-2">
              <div
                className={`cursor-pointer overflow-hidden rounded-md border ${
                  currentImageIndex === index
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />

        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
