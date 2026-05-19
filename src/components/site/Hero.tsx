import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { waLink } from "@/lib/wa";

const HERO_IMG =
  "https://images.unsplash.com/photo-1769794142275-ed099e69b59b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      <img
        src={HERO_IMG}
        alt="Floresta amazônica"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-24 min-h-[92vh] flex flex-col justify-end">
        <div className="max-w-4xl fade-up">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-amber-400 border-l-2 border-amber-400 pl-4 mb-8">
            Desde a terra mais fértil do Brasil
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[0.95] tracking-tight">
            Nutrição de <em className="text-amber-300 not-italic">alta</em>
            <br />
            performance com
            <br />
            raízes amazônicas.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-stone-200 max-w-2xl leading-relaxed">
            Adubos orgânicos selecionados para quem leva o plantio a sério.
            Direto de Iranduba — Amazonas para o seu solo.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold py-4 px-8 transition-colors"
            >
              Ver catálogo
              <ArrowRight
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href={waLink("Olá! Quero saber mais sobre os adubos.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-emerald-900 font-semibold py-4 px-8 transition-colors"
            >
              <WhatsappLogo weight="fill" size={22} />
              Falar com um especialista
            </a>
          </div>
        </div>

        <div className="mt-16 hidden md:grid grid-cols-3 gap-8 max-w-3xl border-t border-white/20 pt-8">
          {[
            ["12+", "Anos cultivando qualidade"],
            ["40+", "Produtos no catálogo"],
            ["100%", "Origem amazônica"],
          ].map(([n, label]) => (
            <div key={label}>
              <div className="font-display text-4xl font-bold text-amber-300">
                {n}
              </div>
              <div className="text-sm text-stone-300 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
