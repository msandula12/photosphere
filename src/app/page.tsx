import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div className="flex h-48 w-48 flex-col" key={image.id}>
          <Link href={`/img/${image.id}`}>
            <Image
              alt={image.name}
              height={192}
              src={image.url}
              style={{ objectFit: "contain" }}
              width={192}
            />
            <h4>{image.name}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please <SignInButton>sign in</SignInButton> above.
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
