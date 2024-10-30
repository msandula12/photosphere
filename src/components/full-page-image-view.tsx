import { clerkClient } from "@clerk/nextjs/server";

import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/db/queries";

export default async function FullPageImageView({
  imageId,
}: {
  imageId: number;
}) {
  const image = await getImage(Number(imageId));
  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        {/* eslint-disable @next/next/no-img-element */}
        <img alt={image.name} className="object-contain" src={image.url} />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(Number(imageId));
            }}
          >
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
