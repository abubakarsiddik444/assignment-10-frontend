"use client";

import { Button } from "@heroui/react";
import { Globe, Image as ImageIcon, Lock, Mail, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export function AuthForm({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const { user } = await apiFetch(`/api/auth/${isRegister ? "register" : "login"}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      router.push(
        searchParams.get("next") ||
          (user?.role === "admin" ? "/dashboard/admin" : "/dashboard"),
      );
      router.refresh();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      {isRegister ? (
        <label>
          Name
          <span className="input-icon">
            <User size={18} />
            <input name="name" type="text" placeholder="Your name" required />
          </span>
        </label>
      ) : null}
      <label>
        Email
        <span className="input-icon">
          <Mail size={18} />
          <input name="email" type="email" placeholder="you@example.com" required />
        </span>
      </label>
      {isRegister ? (
        <label>
          Image URL
          <span className="input-icon">
            <ImageIcon size={18} />
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
        {pending ? "Please wait..." : isRegister ? "Create Account" : "Login"}
      </Button>
      {!isRegister ? (
        <Button
          className="button button-secondary"
          type="button"
          variant="bordered"
          onPress={() => setMessage("Google login is configured in Better Auth; add its route handler to enable OAuth redirects.")}
        >
          <Globe size={18} /> Continue with Google
        </Button>
      ) : null}
      {message ? <p className="toast-message">{message}</p> : null}
    </form>
  );
}
