"use client";

import { useImagesStore } from "~/hooks/use-images-store";

export function SelectAllImages() {
  const { clearSelectedImages, images, selectAllImages, selectedImages } =
    useImagesStore();

  const areAllImagesSelected = images.length === selectedImages.length;

  function toggleSelectAllImages() {
    if (areAllImagesSelected) {
      clearSelectedImages();
    } else {
      selectAllImages();
    }
  }

  return (
    <label
      className="mb-4 inline-flex cursor-pointer items-center gap-2"
      htmlFor="select-all-images"
    >
      <input
        id="select-all-images"
        checked={areAllImagesSelected}
        className="accent-orange-600"
        name="select-all-images"
        onChange={toggleSelectAllImages}
        type="checkbox"
      />{" "}
      Select all images
    </label>
  );
}
