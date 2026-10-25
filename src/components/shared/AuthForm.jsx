"use client";

import { Button, Input } from "@heroui/react";
import {
  Camera,
  Envelope,
  Globe,
  Lock,
  Person,
} from "@gravity-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function AuthForm({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const isRegister = mode === "register";

  function getRedirectPath() {
    const nextPath = searchParams.get("next");
    return nextPath?.startsWith("/") && !nextPath.startsWith("//")
      ? nextPath
      : "/dashboard";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const result = isRegister
        ? await authClient.signUp.email({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            image: payload.image || undefined,
          })
        : await authClient.signIn.email({
            email: payload.email,
            password: payload.password,
          });

      if (result.error) {
        const status = Number(result.error.status || result.error.statusCode);
        const serviceError = Number.isFinite(status) && status >= 500;
        throw new Error(
          serviceError || result.error.code === "INTERNAL_SERVER_ERROR"
            ? "Authentication could not connect to the database. Check the MongoDB Atlas database-user credentials and Network Access IP allowlist in both .env files."
            : result.error.message ||
                result.error.statusText ||
                `${isRegister ? "Registration" : "Login"} failed (${result.error.code || result.error.status || "unknown error"}).`,
        );
      }

      let destination = getRedirectPath();
      try {
        const { user } = await apiFetch("/api/auth/me");
        if (!searchParams.get("next") && user?.role === "admin") {
          destination = "/dashboard/admin";
        }
      } catch (error) {
        toast.error(`Signed in, but the RecipeHub API is unavailable: ${error.message}`);
      }

      toast.success(isRegister ? "Your account is ready!" : "Welcome back!");
      router.push(destination);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not authenticate. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function handleGoogleSignIn() {
    setPending(true);
    try {
      const callbackURL = new URL(getRedirectPath(), window.location.origin).toString();
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: window.location.href,
      });

      if (result.error) {
        throw new Error(result.error.message || "Could not continue with Google.");
      }
    } catch (error) {
      toast.error(error.message || "Could not continue with Google.");
      setPending(false);
    }
  }

  return (
    <form className="grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-bold [&_label]:text-stone-800 dark:[&_label]:text-stone-100 [&_input]:min-h-[46px] [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-stone-100 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-stone-900 [&_input]:placeholder:text-stone-400 [&_input]:focus:border-emerald-600 [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-emerald-600/20 [&_select]:min-h-[46px] [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-stone-200 [&_select]:bg-stone-100 [&_select]:px-3 [&_select]:py-2.5 [&_textarea]:min-h-[46px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-stone-200 [&_textarea]:bg-stone-100 [&_textarea]:px-3 [&_textarea]:py-3 [&_input]:dark:border-neutral-700 [&_input]:dark:bg-neutral-800 [&_input]:dark:text-stone-100 [&_select]:dark:border-neutral-700 [&_select]:dark:bg-neutral-800 [&_select]:dark:text-stone-100 [&_textarea]:dark:border-neutral-700 [&_textarea]:dark:bg-neutral-800 [&_textarea]:dark:text-stone-100" onSubmit={handleSubmit}>
      {isRegister ? (
        <label>
          Name
          <span className="grid min-h-[46px] grid-cols-[auto_1fr] items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-3 dark:border-neutral-700 dark:bg-neutral-800 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-stone-900 [&_input]:outline-none dark:[&_input]:text-stone-100">
            <Person size={18} />
            <Input name="name" type="text" placeholder="Your name" required />
          </span>
        </label>
      ) : null}
      <label>
        Email
        <span className="grid min-h-[46px] grid-cols-[auto_1fr] items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-3 dark:border-neutral-700 dark:bg-neutral-800 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-stone-900 [&_input]:outline-none dark:[&_input]:text-stone-100">
          <Envelope size={18} />
          <Input name="email" type="email" placeholder="you@example.com" required />
        </span>
      </label>
      {isRegister ? (
        <label>
          Image URL
          <span className="grid min-h-[46px] grid-cols-[auto_1fr] items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-3 dark:border-neutral-700 dark:bg-neutral-800 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-stone-900 [&_input]:outline-none dark:[&_input]:text-stone-100">
            <Camera size={18} />
            <Input name="image" type="url" placeholder="https://..." />
          </span>
        </label>
      ) : null}
      <label>
        Password
        <span className="grid min-h-[46px] grid-cols-[auto_1fr] items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-3 dark:border-neutral-700 dark:bg-neutral-800 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-stone-900 [&_input]:outline-none dark:[&_input]:text-stone-100">
          <Lock size={18} />
          <Input
            name="password"
            type="password"
            minLength={6}
            pattern={isRegister ? "(?=.*[a-z])(?=.*[A-Z]).{6,}" : undefined}
            placeholder={isRegister ? "6+ chars, uppercase and lowercase" : "Password"}
            required
          />
        </span>
      </label>
      <Button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
        isDisabled={pending}
        type="submit"
        variant="primary"
      >
        {pending ? "Please wait..." : isRegister ? "Sign Up" : "Login"}
      </Button>
      <Button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
        isDisabled={pending}
        type="button"
        variant="secondary"
        onPress={handleGoogleSignIn}
      >
        <Globe size={18} /> Continue with Google
      </Button>
    </form>
  );
}
