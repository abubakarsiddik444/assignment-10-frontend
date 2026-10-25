"use client";

import { Button } from "@heroui/react";
import { ShoppingCart } from "@gravity-ui/icons";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export function PremiumCheckoutButton() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function checkout() {
    setPending(true);
    setMessage("");
    try {
      const data = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ type: "premium" }),
      });
      window.location.href = data.url;
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message);
      setPending(false);
    }
  }

  return (
    <>
      <Button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
        isDisabled={pending}
        type="button"
        variant="primary"
        onPress={checkout}
      >
        <ShoppingCart width={18} height={18} /> {pending ? "Opening Stripe..." : "Checkout with Stripe"}
      </Button>
      {message ? <p className="mt-3.5 font-bold text-emerald-800 dark:text-emerald-300">{message}</p> : null}
    </>
  );
}
