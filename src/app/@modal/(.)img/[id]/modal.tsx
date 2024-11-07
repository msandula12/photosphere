"use client";

import { useRouter } from "next/navigation";
import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      className="h-screen w-screen bg-black/90 text-white"
      onClose={onDismiss}
      ref={dialogRef}
    >
      {children}
      {/* <button onClick={onDismiss} className="close-button" /> */}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
