import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import ImagesGrid from "~/app/_components/images-grid";
import ImagesToolbar from "~/app/_components/images-toolbar";

export default async function HomePage() {
  return (
    <>
      <main className="flex-grow overflow-auto bg-gradient-to-b from-orange-200 to-violet-300 p-4">
        <SignedOut>
          <h2 className="mt-[33vh] text-center text-xl">
            Please <SignInButton>sign in</SignInButton> above.
          </h2>
        </SignedOut>
        <SignedIn>
          <ImagesGrid />
        </SignedIn>
      </main>
      <SignedIn>
        <ImagesToolbar />
      </SignedIn>
    </>
  );
}
