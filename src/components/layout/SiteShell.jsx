"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Link } from "@heroui/react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  Cup,
  Envelope,
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
  const [menuOpen, setMenuOpen] = useState(false);
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
      <header className="sticky top-4 z-30 mx-auto mt-4 grid w-[calc(100%-2rem)] max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-stone-200/80 bg-white/90 p-3 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 max-[980px]:grid-cols-[1fr_auto] max-[980px]:gap-3 max-[660px]:mt-2 max-[660px]:w-[calc(100%-1.25rem)]">
        <Link className="inline-flex items-center gap-2.5 text-base font-extrabold tracking-tight no-underline" href="/" aria-label="RecipeHub home">
          <span className="inline-grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Cup size={21} />
          </span>
          <span>RecipeHub</span>
        </Link>
        <nav
          id="primary-navigation"
          className={`flex min-w-0 items-center justify-center gap-5 text-sm font-semibold text-stone-600 dark:text-stone-300 max-[980px]:order-last max-[980px]:col-span-full max-[980px]:w-full max-[980px]:flex-col max-[980px]:items-stretch max-[980px]:justify-start max-[980px]:gap-1 max-[980px]:border-t max-[980px]:border-stone-200 max-[980px]:pt-3 max-[980px]:dark:border-neutral-700 min-[981px]:flex [&_a:hover]:text-emerald-800 dark:[&_a:hover]:text-emerald-300 ${menuOpen ? "max-[980px]:flex" : "max-[980px]:hidden"}`}
          aria-label="Primary navigation"
        >
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
                onPress={() => setMenuOpen(false)}
                className={isActive ? "rounded-lg bg-emerald-100 px-2.5 py-1.5 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300" : ""}
              >
                {link.label}
              </Link>
            );
          })}
          {currentUser ? (
            <Button
              className="hidden max-[980px]:inline-flex"
              variant="secondary"
              isDisabled={signingOut}
              onPress={handleSignOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </Button>
          ) : !sessionPending ? (
            <>
              <Link className="hidden max-[980px]:flex max-[980px]:min-h-10 max-[980px]:items-center" href="/login" onPress={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link className="hidden max-[980px]:flex max-[980px]:min-h-10 max-[980px]:items-center" href="/register" onPress={() => setMenuOpen(false)}>
                Sign up
              </Link>
            </>
          ) : null}
        </nav>
        <div className="flex items-center justify-end gap-2 max-[980px]:order-2">
          <ThemeToggle />
          <Button
            className="hidden max-[980px]:inline-flex"
            variant="secondary"
            isIconOnly
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onPress={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true" className="grid gap-1">
              <span className="size-1 rounded-full bg-current" />
              <span className="size-1 rounded-full bg-current" />
              <span className="size-1 rounded-full bg-current" />
            </span>
          </Button>
          {currentUser ? (
            <Button
              className="inline-flex min-h-9 items-center justify-center rounded-xl bg-emerald-700 px-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-55 dark:bg-emerald-400 dark:text-emerald-950 max-[980px]:hidden"
              variant="primary"
              size="sm"
              onPress={handleSignOut}
              isDisabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </Button>
          ) : sessionPending ? null : (
            <>
              <Link className="button button--secondary button--sm max-[980px]:hidden" href="/login">
                Login
              </Link>
              <Link className="button button--primary button--sm max-[980px]:hidden" href="/register">
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
            <div className="flex flex-wrap gap-2.5 [&_a]:rounded-xl [&_a]:border [&_a]:border-stone-200 [&_a]:px-3 [&_a]:py-2 [&_a]:text-sm [&_a]:font-semibold dark:[&_a]:border-neutral-700" aria-label="Social links">
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2"
              >
                <FaFacebookF aria-hidden="true" size={16} />
                Facebook
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2"
              >
                <FaLinkedinIn aria-hidden="true" size={16} />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2"
              >
                <FaGithub aria-hidden="true" size={16} />
                GitHub
              </Link>
            </div>
          </div>
        </div>
        <p className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] border-t border-stone-200 py-[18px] pb-7 text-stone-500 dark:border-neutral-800 dark:text-stone-400 max-[660px]:w-[calc(100%-1.25rem)]">Copyright 2026 RecipeHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
