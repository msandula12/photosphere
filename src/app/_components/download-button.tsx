"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LoadingSpinner } from "~/app/_components/loading-spinner";
import { Toast } from "~/app/_components/toast";
import { useImagesStore } from "~/hooks/use-images-store";
import type { Image as ImageType } from "~/types";
import { pluralize } from "~/utils";

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
    toast.error(<Toast>Failed to delete image with ID {imageId}</Toast>);
  }
}

async function downloadImage({ name, url }: ImageType) {
  const image = await fetch(url);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function DownloadSvg() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadButton() {
  const { clearSelectedImages, selectedImages } = useImagesStore();
  const router = useRouter();

  const hasSelectedImages = selectedImages.length > 0;

  async function downloadImages() {
    try {
      toast(
        <Toast icon={<LoadingSpinner />}>
          Downloading {selectedImages.length}{" "}
          {pluralize("image", selectedImages.length)}
        </Toast>,
        {
          duration: 100000, // 100 seconds
          id: "download-begin",
        },
      );
      for (const selectedImage of selectedImages) {
        await downloadImage(selectedImage);
        await deleteImageFromDb(selectedImage.id);
      }
      clearSelectedImages();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss("download-begin");
    }
  }

  return (
    <button
      aria-disabled={!hasSelectedImages}
      disabled={!hasSelectedImages}
      className="flex w-full flex-1 items-center justify-center gap-2 rounded-lg bg-violet-100 px-4 py-2 font-semibold text-violet-800 transition-colors duration-200 hover:bg-violet-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 sm:w-auto"
      onClick={downloadImages}
    >
      <DownloadSvg /> Download {selectedImages.length}{" "}
      {pluralize("image", selectedImages.length)}
    </button>
  );
}
