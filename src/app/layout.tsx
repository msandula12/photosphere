import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";

import { Toaster } from "~/app/_components/toaster";
import { TopNav } from "~/app/_components/top-nav";
import { ourFileRouter } from "~/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "PhotoSphere",
  description:
    "Upload photos from any device and download them onto any other device.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body
          className={`font-sans ${GeistSans.variable} bg-gradient-to-b from-orange-200 to-violet-300`}
        >
          <div className="flex min-h-screen flex-col">
            <TopNav />
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
