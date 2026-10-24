import Link from "next/link";
import { Cup } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <section className="status-page">
      <div className="not-found-illustration">
        <Cup size={72} />
        <span>404</span>
      </div>
      <h1>Recipe not found</h1>
      <p>The page you requested may have moved, expired, or never made it out of the kitchen.</p>
      <Link className="button button-primary" href="/">
        Back Home
      </Link>
    </section>
  );
}
