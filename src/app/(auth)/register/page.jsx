import Link from "next/link";
import { AuthForm } from "@/components/shared/AuthForm";

export const metadata = {
  title: "Register - RecipeHub",
};

export default function RegisterPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-[calc(100%-2rem)] max-w-[1180px] place-items-center py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)]">
      <div className="w-full max-w-[520px] rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_h1]:m-0 [&_h1]:text-4xl [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Join RecipeHub</span>
        <h1>Register</h1>
        <AuthForm mode="register" />
        <p className="text-sm leading-[1.6] text-stone-500 dark:text-stone-400 [&_a]:text-emerald-800 dark:[&_a]:text-emerald-300">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
