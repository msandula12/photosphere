"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useEffect } from "react";

import { useImagesStore } from "~/hooks/use-images-store";
import type { Image as ImageType } from "~/types";

export function ImagesGrid({ images }: { images: ImageType[] }) {
  const { selectedImages, setImages, toggleSelectedImage } = useImagesStore();

  useEffect(() => {
    setImages(images);
  }, [images, setImages]);

  return (
    <>
      {images.map((image) => {
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
            <div className="relative h-full w-full bg-black">
              <Image
                alt={image.name}
                className="object-contain"
                fill
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
