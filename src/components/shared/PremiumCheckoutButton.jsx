"use client";

import { Button } from "@heroui/react";
import { ShoppingCart } from "@gravity-ui/icons";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

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
      setPending(false);
    }
  }

  return (
    <>
      <Button
        className="button button-primary"
        isDisabled={pending}
        type="button"
        variant="solid"
        onPress={checkout}
      >
        <ShoppingCart width={18} height={18} /> {pending ? "Opening Stripe..." : "Checkout with Stripe"}
      </Button>
      {message ? <p className="toast-message">{message}</p> : null}
    </>
  );
}
