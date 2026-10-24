"use client";

import { Button } from "@heroui/react";
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
    <form className="form-grid" onSubmit={handleSubmit}>
      {isRegister ? (
        <label>
          Name
          <span className="input-icon">
            <Person size={18} />
            <input name="name" type="text" placeholder="Your name" required />
          </span>
        </label>
      ) : null}
      <label>
        Email
        <span className="input-icon">
          <Envelope size={18} />
          <input name="email" type="email" placeholder="you@example.com" required />
        </span>
      </label>
      {isRegister ? (
        <label>
          Image URL
          <span className="input-icon">
            <Camera size={18} />
            <input name="image" type="url" placeholder="https://..." />
          </span>
        </label>
      ) : null}
      <label>
        Password
        <span className="input-icon">
          <Lock size={18} />
          <input
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
        className="button button-primary"
        isDisabled={pending}
        type="submit"
        variant="solid"
      >
        {pending ? "Please wait..." : isRegister ? "Sign Up" : "Login"}
      </Button>
      <Button
        className="button button-secondary"
        isDisabled={pending}
        type="button"
        variant="bordered"
        onPress={handleGoogleSignIn}
      >
        <Globe size={18} /> Continue with Google
      </Button>
    </form>
  );
}
