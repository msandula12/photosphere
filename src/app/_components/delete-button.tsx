"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useImagesStore } from "~/hooks/use-images-store";

async function deleteImageFromDb(imageId: number) {
  try {
    const response = await fetch(`/api/img/${imageId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    toast.error(`Failed to delete image with ID ${imageId}`);
  }
}

function DeleteSvg() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeleteButton() {
  const { clearSelectedImages, selectedImages } = useImagesStore();
  const router = useRouter();

  const hasSelectedImages = selectedImages.length > 0;

  async function deleteImages() {
    try {
      toast(
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span className="text-lg">
            Deleting {selectedImages.length} image
            {selectedImages.length === 1 ? "" : "s"}
          </span>
        </div>,
        {
          duration: 100000, // 100 seconds
          id: "delete-begin",
        },
      );
      for (const selectedImage of selectedImages) {
        await deleteImageFromDb(selectedImage.id);
      }
      clearSelectedImages();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss("delete-begin");
    }
  }

  return (
    <button
      aria-disabled={!hasSelectedImages}
      disabled={!hasSelectedImages}
      className="flex w-full flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-800 transition-colors duration-200 hover:bg-violet-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 sm:w-auto"
      onClick={deleteImages}
    >
      <DeleteSvg /> Delete {selectedImages.length} image
      {selectedImages.length === 1 ? "" : "s"}
    </button>
  );
}
