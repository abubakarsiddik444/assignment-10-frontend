import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { UiProviders } from "@/components/shared/UiProviders";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeHub - Recipe Sharing Platform",
  description:
    "Create, discover, purchase, and manage community recipes in RecipeHub.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-stone-50 font-[var(--font-geist-sans)] text-stone-900 dark:bg-neutral-950 dark:text-stone-100">
        <UiProviders>
          <ThemeProvider>
            <SiteShell>{children}</SiteShell>
          </ThemeProvider>
        </UiProviders>
      </body>
    </html>
  );
}
