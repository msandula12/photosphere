import { clsx } from "clsx";

import ImagesGrid from "~/app/_components/images-grid";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

function ImagePlaceholderSvg() {
  return (
    <svg
      className="size-64 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ImagesContainer() {
  const images = await getMyImages();
  const hasImages = images.length > 0;

  const imagesGridClassNames = clsx(
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
    {
      "items-center justify-center": !hasImages,
    },
  );

  return (
    <div className="container mx-auto">
      <div className={imagesGridClassNames}>
        {!hasImages && <ImagePlaceholderSvg />}
        <ImagesGrid images={images} />
      </div>
    </div>
  );
}
