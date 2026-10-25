"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Toaster } from "react-hot-toast";

export function UiProviders({ children }) {
  const router = useRouter();
  const navigate = useCallback((path) => router.push(path), [router]);

  return (
    <RouterProvider navigate={navigate}>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </RouterProvider>
  );
}
