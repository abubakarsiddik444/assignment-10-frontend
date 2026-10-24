import { BadgeCheck, Infinity, Sparkles } from "lucide-react";
import { PremiumCheckoutButton } from "@/components/shared/PremiumCheckoutButton";

export const metadata = {
  title: "Premium - RecipeHub",
};

export default function PremiumPage() {
  return (
    <section className="page-section pricing-page">
      <div className="page-heading">
        <span className="eyebrow">Premium membership</span>
        <h1>Unlock unlimited recipe publishing</h1>
        <p>Stripe Checkout-ready membership flow with premium badge and transaction storage.</p>
      </div>
      <div className="pricing-card">
        <Sparkles size={30} />
        <h2>RecipeHub Premium</h2>
        <p className="price">$19.99</p>
        <ul className="check-list">
          <li>
            <Infinity size={17} /> Unlimited Add Recipe access
          </li>
          <li>
            <BadgeCheck size={17} /> Premium profile badge
          </li>
          <li>Saved transaction in payments collection</li>
        </ul>
        <PremiumCheckoutButton />
      </div>
    </section>
  );
}
