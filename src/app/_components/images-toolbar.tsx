import DownloadButton from "./download-button";
import UploadButton from "./upload-button";

export default function ImagesToolbar() {
  return (
    <div className="sticky bottom-0 z-10 bg-violet-300 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <UploadButton />
        <DownloadButton />
      </div>
    </div>
  );
}
