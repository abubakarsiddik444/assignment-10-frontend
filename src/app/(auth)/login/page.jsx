import Link from "next/link";
import { AuthForm } from "@/components/shared/AuthForm";

export const metadata = {
  title: "Login - RecipeHub",
};

export default function LoginPage() {
  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Welcome back</span>
        <h1>Login</h1>
        <AuthForm mode="login" />
        <p className="fine-print">
          New here? <Link href="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
