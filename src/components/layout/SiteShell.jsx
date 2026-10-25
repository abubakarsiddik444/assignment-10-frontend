"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Link } from "@heroui/react";
import {
  Camera,
  Comment,
  Cup,
  Envelope,
  Globe,
  MapPin,
  Smartphone,
} from "@gravity-ui/icons";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse-recipes", label: "Browse Recipes" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/admin", label: "Admin" },
];

export function SiteShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionPending, setSessionPending] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const isAdminPath = pathname === "/dashboard/admin" ||
    pathname.startsWith("/dashboard/admin/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");
  const isBrowsePath = pathname === "/recipes" ||
    pathname.startsWith("/recipes/");

  useEffect(() => {
    let active = true;
    apiFetch("/api/auth/me")
      .then(({ user }) => {
        if (active) setCurrentUser(user || null);
      })
      .catch((error) => {
        console.error("Could not resolve the current user.", error);
        if (active) setCurrentUser(null);
      })
      .finally(() => {
        if (active) setSessionPending(false);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  const isAdmin = currentUser?.role === "admin";

  async function handleSignOut() {
    setSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message || "Could not sign out.");
      setCurrentUser(null);
      toast.success("Signed out.");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not sign out.");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900 dark:bg-neutral-950 dark:text-stone-100">
      <header className="sticky top-4 z-30 mx-auto mt-4 grid w-[calc(100%-2rem)] max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-stone-200/80 bg-white/90 p-3 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 max-[980px]:grid-cols-1 max-[660px]:mt-2 max-[660px]:w-[calc(100%-1.25rem)]">
        <Link className="inline-flex items-center gap-2.5 text-base font-extrabold tracking-tight no-underline" href="/" aria-label="RecipeHub home">
          <span className="inline-grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Cup size={21} />
          </span>
          <span>RecipeHub</span>
        </Link>
        <nav className="flex items-center justify-center gap-5 text-sm font-semibold text-stone-600 dark:text-stone-300 max-[980px]:order-last max-[980px]:col-span-full max-[980px]:justify-start max-[980px]:overflow-x-auto max-[980px]:pb-1 [&_a:hover]:text-emerald-800 dark:[&_a:hover]:text-emerald-300" aria-label="Primary navigation">
          {navLinks.filter((link) => link.href !== "/dashboard/admin" || isAdmin).map((link) => {
            const isActive = link.href === "/"
              ? pathname === "/"
              : link.href === "/dashboard"
                ? pathname === "/dashboard" || (pathname.startsWith("/dashboard/") && !isAdminPath)
                : link.href === "/browse-recipes"
                  ? pathname === link.href || pathname.startsWith(`${link.href}/`) || isBrowsePath
                  : isAdminPath;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "rounded-lg bg-emerald-100 px-2.5 py-1.5 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300" : ""}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-end gap-2 max-[660px]:[&>a]:hidden">
          <ThemeToggle />
          {currentUser ? (
            <Button
              className="inline-flex min-h-9 items-center justify-center rounded-xl bg-emerald-700 px-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-55 dark:bg-emerald-400 dark:text-emerald-950"
              variant="primary"
              size="sm"
              onPress={handleSignOut}
              isDisabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </Button>
          ) : sessionPending ? null : (
            <>
              <Link className="button button--secondary button--sm" href="/login">
                Login
              </Link>
              <Link className="button button--primary button--sm" href="/register">
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-10 border-t border-stone-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_a:hover]:text-emerald-800 dark:[&_a:hover]:text-emerald-300">
        <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1180px] grid-cols-[1.3fr_.7fr_1fr_.6fr] gap-7 py-[42px] max-[980px]:grid-cols-1 max-[660px]:w-[calc(100%-1.25rem)] [&>div]:grid [&>div]:content-start [&>div]:gap-2 [&_h3]:mb-3 [&_h3]:mt-0 [&_h3]:text-base [&_h3]:font-bold">
          <div>
            <Link className="inline-flex items-center gap-2.5 text-base font-extrabold tracking-tight no-underline w-fit" href="/">
              <span className="inline-grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Cup size={21} />
              </span>
              <span>RecipeHub</span>
            </Link>
            <p>
              A community kitchen for sharing recipes, discovering favorite dishes,
              and supporting premium creators.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link href="/browse-recipes">Browse Recipes</Link>
            <Link href="/dashboard/add-recipe">Add Recipe</Link>
            <Link href="/dashboard/favorites">Favorites</Link>
            <Link href="/premium">Premium</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <p className="m-0 inline-flex items-center gap-1.5">
              <Envelope size={16} /> hello@recipehub.test
            </p>
            <p className="m-0 inline-flex items-center gap-1.5">
              <Smartphone size={16} /> +880 1700 000000
            </p>
            <p className="m-0 inline-flex items-center gap-1.5">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <h3>Social</h3>
            <div className="flex gap-2.5 [&_a]:grid [&_a]:size-[38px] [&_a]:place-items-center [&_a]:rounded-xl [&_a]:border [&_a]:border-stone-200 dark:[&_a]:border-neutral-700" aria-label="Social links">
              <Link href="#" aria-label="Facebook">
                <Globe size={18} />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Camera size={18} />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Comment size={18} />
              </Link>
            </div>
          </div>
        </div>
        <p className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] border-t border-stone-200 py-[18px] pb-7 text-stone-500 dark:border-neutral-800 dark:text-stone-400 max-[660px]:w-[calc(100%-1.25rem)]">Copyright 2026 RecipeHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
