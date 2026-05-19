import { WhatsappLogo } from "@phosphor-icons/react";
import { waLink, COMPANY_EMAIL } from "@/lib/wa";

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-stone-200 py-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-white">
          Adubo<span className="text-amber-500">.</span>Amazônico
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          <div className="text-sm text-stone-400">© {new Date().getFullYear()} Adubo Amazônico. Todos os direitos reservados.</div>
          <div className="text-sm">
            <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-amber-400">{COMPANY_EMAIL}</a>
          </div>
          <div className="text-sm md:text-right">
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-amber-400">
              <WhatsappLogo size={16} weight="fill" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
