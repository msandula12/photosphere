import DeleteButton from "./delete-button";
import DownloadButton from "./download-button";
import UploadButton from "./upload-button";

export default function ImagesToolbar() {
  return (
    <div className="sticky bottom-0 z-10 bg-violet-300 shadow-md">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 px-4 py-3 max-sm:container sm:flex-row sm:gap-4">
        <UploadButton />
        <DeleteButton />
        <DownloadButton />
      </div>
    </div>
  );
}
