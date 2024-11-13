"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useImagesStore } from "~/hooks/use-images-store";
import { useUploadThing } from "~/utils/uploadthing";

const MAX_IMAGES = 100;

type Input = Parameters<typeof useUploadThing>;

function useUploadThingInputProps(...args: Input) {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    await $ut.startUpload(selectedFiles);
  };

  return {
    inputProps: {
      accept: "image/*",
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      onChange,
    },
    isUploading: $ut.isUploading,
  };
}

function UploadSvg() {
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
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UploadButton() {
  const { images } = useImagesStore();
  const router = useRouter();

  const hasMaxImages = images.length === MAX_IMAGES;

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onClientUploadComplete: () => {
      toast.dismiss("upload-begin");
      toast.success(<span className="text-lg">Uploading complete!</span>);
      router.refresh();
    },
    onBeforeUploadBegin: (files) => {
      const numberOfUploadsRemaining = MAX_IMAGES - images.length;
      console.log("numberOfUploadsRemaining: ", numberOfUploadsRemaining);
      if (files.length > numberOfUploadsRemaining) {
        toast.warning(
          <span className="text-lg">
            Maximum of {MAX_IMAGES} photos reached
          </span>,
        );
      }
      return files.slice(0, numberOfUploadsRemaining);
    },
    onUploadBegin: () => {
      toast(
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span className="text-lg">Uploading...</span>
        </div>,
        {
          duration: 100000, // 100 seconds
          id: "upload-begin",
        },
      );
    },
    onUploadError: () => {
      toast.dismiss("upload-begin");
      toast.error(
        <span className="text-lg">Upload failed. Try again later.</span>,
      );
    },
  });

  return (
    <label
      className="flex w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-100 px-4 py-2 font-semibold text-orange-800 transition-colors duration-200 hover:bg-orange-200 has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-gray-300 has-[:disabled]:text-gray-400 sm:w-auto"
      htmlFor="upload-button"
    >
      <UploadSvg /> Upload
      <input
        aria-disabled={hasMaxImages}
        className="sr-only"
        disabled={hasMaxImages}
        id="upload-button"
        type="file"
        {...inputProps}
      />
    </label>
  );
}
