import { Cup } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-[calc(100%-2rem)] max-w-[1180px] place-items-center py-[4.5rem] text-center max-[660px]:w-[calc(100%-1.25rem)] [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:mx-auto [&_p]:max-w-[560px] [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300">
      <Card className="mb-5 grid size-[180px] place-items-center gap-2.5 [&_span]:text-3xl [&_span]:font-black [&_span]:text-orange-700 dark:[&_span]:text-orange-300">
        <Cup size={72} />
        <span>404</span>
      </Card>
      <h1>Recipe not found</h1>
      <p>The page you requested may have moved, expired, or never made it out of the kitchen.</p>
      <Link className="button button--primary button--lg" href="/">
        Back Home
      </Link>
    </section>
  );
}
