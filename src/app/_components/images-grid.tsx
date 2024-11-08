"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useState } from "react";

type Image = {
  id: number;
  name: string;
  url: string;
};

export default function ImagesGrid({ images }: { images: Image[] }) {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  return (
    <>
      {images.map((image) => {
        const imageClassNames = clsx(
          "group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg border-8 border-white shadow-md transition-all duration-300 ease-in-out hover:scale-105",
          {
            "border-orange-600": selectedImages.some(
              (selectedImage) => selectedImage.id === image.id,
            ),
          },
        );

        return (
          <div
            key={image.id}
            className={imageClassNames}
            onClick={() => {
              setSelectedImages((prev) => {
                const isImageSelected = prev.some((img) => img.id === image.id);
                if (isImageSelected) {
                  return prev.filter((img) => img.id !== image.id);
                } else {
                  return [...prev, image];
                }
              });
            }}
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