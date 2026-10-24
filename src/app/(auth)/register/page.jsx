import Link from "next/link";
import { AuthForm } from "@/components/shared/AuthForm";

export const metadata = {
  title: "Register - RecipeHub",
};

export default function RegisterPage() {
  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Join RecipeHub</span>
        <h1>Register</h1>
        <AuthForm mode="register" />
        <p className="fine-print">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
