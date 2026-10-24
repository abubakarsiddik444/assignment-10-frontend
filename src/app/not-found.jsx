import Link from "next/link";
import { Cup } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-[calc(100%-2rem)] max-w-[1180px] place-items-center py-[4.5rem] text-center max-[660px]:w-[calc(100%-1.25rem)] [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:mx-auto [&_p]:max-w-[560px] [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300">
      <div className="mb-5 grid size-[180px] place-items-center gap-2.5 rounded-2xl border border-stone-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 [&_span]:text-3xl [&_span]:font-black [&_span]:text-orange-700 dark:[&_span]:text-orange-300">
        <Cup size={72} />
        <span>404</span>
      </div>
      <h1>Recipe not found</h1>
      <p>The page you requested may have moved, expired, or never made it out of the kitchen.</p>
      <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300" href="/">
        Back Home
      </Link>
    </section>
  );
}
