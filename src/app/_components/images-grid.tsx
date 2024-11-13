"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "~/../tailwind.config";

import { useImagesStore } from "~/hooks/use-images-store";
import type { Image as ImageType } from "~/types";

const fullConfig = resolveConfig(tailwindConfig);

function getNumberOfImagesAboveFold(width: number) {
  if (width >= Number.parseInt(fullConfig.theme.screens.lg)) {
    return 18;
  } else if (width >= Number.parseInt(fullConfig.theme.screens.md)) {
    return 12;
  } else if (width >= Number.parseInt(fullConfig.theme.screens.sm)) {
    return 9;
  } else {
    return 4;
  }
}

export function ImagesGrid({ images }: { images: ImageType[] }) {
  const [width, setWidth] = useState(0);

  const { selectedImages, setImages, toggleSelectedImage } = useImagesStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    setImages(images);
  }, [images, setImages]);

  const numberOfImagesAboveFold = getNumberOfImagesAboveFold(width);

  return (
    <>
      {images.map((image, index) => {
        const isImageSelected = selectedImages.some(
          (selectedImage) => selectedImage.id === image.id,
        );
        const imageClassNames = clsx(
          "group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg border-8 shadow-md transition-all duration-300 ease-in-out hover:scale-105",
          {
            "border-orange-600": isImageSelected,
            "border-white": !isImageSelected,
          },
        );

        return (
          <div
            key={image.id}
            className={imageClassNames}
            onClick={() => toggleSelectedImage(image)}
          >
            <div className="relative flex h-full w-full items-center justify-center bg-black">
              <Image
                alt={image.name}
                className="object-contain"
                fill
                priority={index <= numberOfImagesAboveFold}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                src={image.url}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
