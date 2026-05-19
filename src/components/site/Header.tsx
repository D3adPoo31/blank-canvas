import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { List, X, ShoppingCartSimple } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/wa";

const NAV = [
  { href: "#benefits", label: "Diferenciais" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display font-extrabold text-xl tracking-tight ${
            scrolled ? "text-emerald-900" : "text-white"
          }`}
        >
          Adubo<span className="text-amber-600">.</span>Amazônico
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium link-underline ${
                scrolled ? "text-stone-800" : "text-stone-100"
              } hover:opacity-80`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/checkout"
            className={`relative inline-flex items-center justify-center w-11 h-11 border ${
              scrolled
                ? "border-stone-300 text-emerald-900 hover:bg-stone-100"
                : "border-white/40 text-white hover:bg-white/10"
            } transition-colors`}
            aria-label="Carrinho"
          >
            <ShoppingCartSimple size={20} weight="bold" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <a
            href={waLink("Olá! Quero saber mais sobre os adubos.")}
            target="_blank"
            rel="noreferrer"
            className="bg-amber-700 hover:bg-amber-600 text-white font-semibold py-3 px-6 text-sm transition-colors"
          >
            Falar no WhatsApp
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/checkout"
            className={`relative inline-flex items-center justify-center w-10 h-10 ${
              scrolled ? "text-emerald-900" : "text-white"
            }`}
            aria-label="Carrinho"
          >
            <ShoppingCartSimple size={22} weight="bold" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className={`${scrolled ? "text-emerald-900" : "text-white"}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-stone-50 border-t border-stone-200">
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-stone-800 text-lg font-medium"
              >
                {n.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-700 text-white font-semibold py-3 px-6 text-center"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
