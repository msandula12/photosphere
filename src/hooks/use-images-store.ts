import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

import type { Image as ImageType } from "~/types";

interface ImagesState {
  clearSelectedImages: () => void;
  images: ImageType[];
  selectAllImages: () => void;
  selectedImages: ImageType[];
  setImages: (images: ImageType[]) => void;
  toggleSelectedImage: (image: ImageType) => void;
}

export const useImagesStore = create<ImagesState>()(
  devtools(
    persist(
      (set) => ({
        clearSelectedImages: () => set(() => ({ selectedImages: [] })),
        images: [],
        selectAllImages: () =>
          set((state) => ({ selectedImages: state.images })),
        selectedImages: [],
        setImages: (images) => set(() => ({ images })),
        toggleSelectedImage: (image) =>
          set((state) => {
            const isImageSelected = state.selectedImages.some(
              (img) => img.id === image.id,
            );
            return {
              selectedImages: isImageSelected
                ? state.selectedImages.filter((img) => img.id !== image.id)
                : [...state.selectedImages, image],
            };
          }),
      }),
      {
        name: "images-storage",
      },
    ),
  ),
);
