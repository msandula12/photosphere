import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

import type { Image as ImageType } from "~/types";

interface ImagesState {
  clearSelectedImages: () => void;
  selectedImages: ImageType[];
  toggleSelectedImage: (image: ImageType) => void;
}

export const useImagesStore = create<ImagesState>()(
  devtools(
    persist(
      (set) => ({
        clearSelectedImages: () => set(() => ({ selectedImages: [] })),
        selectedImages: [],
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
