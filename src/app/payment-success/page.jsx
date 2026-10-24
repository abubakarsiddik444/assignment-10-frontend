import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { PaymentConfirmer } from "@/components/shared/PaymentConfirmer";

export const metadata = {
  title: "Payment Success - RecipeHub",
};

export default function PaymentSuccessPage() {
  return (
    <section className="status-page">
      <CircleCheck size={58} />
      <h1>Payment confirmed</h1>
      <PaymentConfirmer />
      <Link className="button button-primary" href="/dashboard">
        Back to Dashboard
      </Link>
    </section>
  );
}
