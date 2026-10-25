import Link from "next/link";
import { CircleCheck } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { PaymentConfirmer } from "@/components/shared/PaymentConfirmer";

export const metadata = {
  title: "Payment Success - RecipeHub",
};

export default function PaymentSuccessPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-[calc(100%-2rem)] max-w-[1180px] place-items-center py-[4.5rem] text-center max-[660px]:w-[calc(100%-1.25rem)] [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:mx-auto [&_p]:max-w-[560px] [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300">
      <Card className="grid justify-items-center gap-5 p-8 text-center">
      <CircleCheck size={58} />
      <h1>Payment confirmed</h1>
      <PaymentConfirmer />
      <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300" href="/dashboard">
        Back to Dashboard
      </Link>
      </Card>
    </section>
  );
}
