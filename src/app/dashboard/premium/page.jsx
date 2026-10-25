import { Check, SealCheck, Sparkles } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { PremiumCheckoutButton } from "@/components/shared/PremiumCheckoutButton";

export const metadata = {
  title: "Premium - RecipeHub",
};

export default function PremiumPage() {
  return (
    <section className="mx-auto grid w-[calc(100%-2rem)] max-w-[1180px] justify-items-center py-[4.5rem] text-center max-[660px]:w-[calc(100%-1.25rem)]">
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Premium membership</span>
        <h1>Unlock unlimited recipe publishing</h1>
        <p>Stripe Checkout-ready membership flow with premium badge and transaction storage.</p>
      </div>
      <Card className="w-full max-w-[520px] text-center [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_svg]:mx-auto [&_svg]:text-amber-500">
        <Card.Content className="p-[22px]">
        <Sparkles size={30} />
        <h2>RecipeHub Premium</h2>
        <p className="my-3 text-5xl font-black text-emerald-800 dark:text-emerald-300">$19.99</p>
        <ul className="mt-4 grid list-none gap-2.5 p-0 [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:text-stone-600 dark:[&_li]:text-stone-300 [&_li]:before:size-2 [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-emerald-600 [&_li]:before:content-['']">
          <li>
            <Check size={17} /> Unlimited Add Recipe access
          </li>
          <li>
            <SealCheck size={17} /> Premium profile badge
          </li>
          <li>Saved transaction in payments collection</li>
        </ul>
        <PremiumCheckoutButton />
        </Card.Content>
      </Card>
    </section>
  );
}
