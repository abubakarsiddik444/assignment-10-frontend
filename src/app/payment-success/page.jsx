import { Card } from "@heroui/react";
import { PaymentConfirmer } from "@/components/shared/PaymentConfirmer";

export const metadata = {
  title: "Payment Success - RecipeHub",
};

export default function PaymentSuccessPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-[calc(100%-2rem)] max-w-[1180px] place-items-center py-[4.5rem] text-center max-[660px]:w-[calc(100%-1.25rem)] [&_p]:mx-auto [&_p]:max-w-[560px] [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
      <Card className="w-full max-w-2xl p-8 text-center">
        <Card.Content>
          <PaymentConfirmer />
        </Card.Content>
      </Card>
    </section>
  );
}
