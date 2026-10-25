import { CircleCheck } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
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
      <Link className="button button--primary button--lg" href="/dashboard">
        Back to Dashboard
      </Link>
      </Card>
    </section>
  );
}
