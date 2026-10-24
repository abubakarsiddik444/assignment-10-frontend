import Link from "next/link";
import { ChefHat, Globe, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse-recipes", label: "Browse Recipes" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/admin", label: "Admin" },
];

export function SiteShell({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="RecipeHub home">
          <span className="brand-mark">
            <ChefHat size={21} />
          </span>
          <span>RecipeHub</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-ghost compact" href="/login">
            Login
          </Link>
          <Link className="button button-primary compact" href="/register">
            Sign up
          </Link>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <Link className="brand footer-brand" href="/">
              <span className="brand-mark">
                <ChefHat size={21} />
              </span>
              <span>RecipeHub</span>
            </Link>
            <p>
              A community kitchen for sharing recipes, discovering favorite dishes,
              and supporting premium creators.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link href="/browse-recipes">Browse Recipes</Link>
            <Link href="/dashboard/add-recipe">Add Recipe</Link>
            <Link href="/dashboard/favorites">Favorites</Link>
            <Link href="/premium">Premium</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <p className="footer-line">
              <Mail size={16} /> hello@recipehub.test
            </p>
            <p className="footer-line">
              <Phone size={16} /> +880 1700 000000
            </p>
            <p className="footer-line">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <h3>Social</h3>
            <div className="social-row" aria-label="Social links">
              <Link href="#" aria-label="Facebook">
                <Globe size={18} />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Share2 size={18} />
              </Link>
              <Link href="#" aria-label="Twitter">
                <MessageCircle size={18} />
              </Link>
            </div>
          </div>
        </div>
        <p className="copyright">Copyright 2026 RecipeHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
