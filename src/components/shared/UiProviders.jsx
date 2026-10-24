"use client";

import { Toaster } from "react-hot-toast";

export function UiProviders({ children }) {
  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </>
  );
}
