import Link from "next/link";
import { Card } from "@heroui/react";
import { AuthForm } from "@/components/shared/AuthForm";

export const metadata = {
  title: "Login - RecipeHub",
};

export default function LoginPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-[calc(100%-2rem)] max-w-[1180px] place-items-center py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)]">
      <Card className="w-full max-w-[520px] [&_h1]:m-0 [&_h1]:text-4xl [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
        <Card.Content className="grid gap-4 p-[22px]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Welcome back</span>
        <h1>Login</h1>
        <AuthForm mode="login" />
        <p className="text-sm leading-[1.6] text-stone-500 dark:text-stone-400 [&_a]:text-emerald-800 dark:[&_a]:text-emerald-300">
          New here? <Link href="/register">Create an account</Link>
        </p>
        </Card.Content>
      </Card>
    </section>
  );
}
