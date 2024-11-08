"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import LoadingSpinner from "~/components/ui/loading-spinner";
import { useUploadThing } from "~/utils/uploadthing";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
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
};

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

export default function UploadButton() {
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onClientUploadComplete: () => {
      toast.dismiss("upload-begin");
      toast(<span className="text-lg">Uploading complete!</span>);
      router.refresh();
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
    <div className="rounded-lg bg-orange-100 px-4 py-2 font-semibold text-orange-800 transition-colors duration-200 hover:bg-orange-200">
      <label
        className="flex cursor-pointer items-center gap-2"
        htmlFor="upload-button"
      >
        <UploadSvg /> Upload
      </label>
      <input
        className="sr-only"
        id="upload-button"
        type="file"
        {...inputProps}
      />
    </div>
  );
}
