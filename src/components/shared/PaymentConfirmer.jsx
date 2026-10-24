"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export function PaymentConfirmer() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState(
    sessionId ? "Checking payment status..." : "Payment confirmation page is ready."
  );

  useEffect(() => {
    if (!sessionId) return;

    apiFetch("/api/payments/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })
      .then(() => {
        setMessage("Payment saved and premium status updated.");
        toast.success("Payment confirmed.");
      })
      .catch((error) => {
        setMessage(error.message);
        toast.error(error.message);
      });
  }, [sessionId]);

  return <p>{message}</p>;
}
