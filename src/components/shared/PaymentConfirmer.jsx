"use client";

import { CircleCheck, CircleExclamation, CircleXmark } from "@gravity-ui/icons";
import { Link, Spinner } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function PaymentConfirmer() {
  const searchParams = useSearchParams();
  const { refetch } = authClient.useSession();
  const sessionId = searchParams.get("session_id");
  const [result, setResult] = useState(() =>
    sessionId
      ? { status: "checking", payment: null, message: "" }
      : {
          status: "missing",
          payment: null,
          message: "No payment session was provided. If you completed a purchase, check your account before trying again.",
        },
  );

  useEffect(() => {
    if (!sessionId) return;

    let active = true;
    apiFetch("/api/payments/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })
      .then(({ payment }) => {
        if (!payment || payment.paymentStatus !== "paid") {
          throw new Error("Stripe has not marked this payment as paid yet. Please wait a moment and try again.");
        }
        if (active) {
          setResult({
            status: "success",
            payment,
            message: payment.recipeId
              ? "Your recipe purchase is confirmed and saved to your purchased recipes."
              : "Your Premium membership is active. You can now publish unlimited recipes.",
          });
          refetch();
          toast.success("Payment confirmed.");
        }
      })
      .catch((error) => {
        if (active) {
          setResult({
            status: "error",
            payment: null,
            message: error.message || "We could not confirm this payment. Please contact support if you were charged.",
          });
          toast.error(error.message || "Could not confirm payment.");
        }
      });

    return () => {
      active = false;
    };
  }, [refetch, sessionId]);

  const isSuccess = result.status === "success";
  const Icon = isSuccess
    ? CircleCheck
    : result.status === "checking"
      ? CircleExclamation
      : CircleXmark;

  return (
    <div className="grid justify-items-center gap-4">
      {result.status === "checking" ? (
        <Spinner aria-label="Confirming payment" />
      ) : (
        <Icon
          size={58}
          className={isSuccess ? "text-emerald-700 dark:text-emerald-300" : "text-amber-600 dark:text-amber-400"}
          aria-hidden="true"
        />
      )}
      <div>
        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold">
          {isSuccess
            ? "Payment confirmed"
            : result.status === "checking"
              ? "Confirming your payment"
              : "Payment not confirmed"}
        </h1>
        <p role={result.status === "error" ? "alert" : "status"} className="mt-3">
          {result.status === "checking" ? "Please wait while we verify your payment with Stripe." : result.message}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {isSuccess && result.payment?.recipeId ? (
          <Link className="button button--primary button--lg" href="/dashboard/purchased">
            View Purchased Recipes
          </Link>
        ) : null}
        {isSuccess && !result.payment?.recipeId ? (
          <Link className="button button--primary button--lg" href="/dashboard/add-recipe">
            Add a Recipe
          </Link>
        ) : null}
        <Link className="button button--secondary button--lg" href="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
