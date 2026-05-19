import { Leaf, Truck, ShieldCheck, Plant } from "@phosphor-icons/react";

const items = [
  {
    icon: Leaf,
    title: "Origem Amazônica",
    desc: "Matéria-prima de terra fértil, coletada de forma responsável na região de Iranduba-AM.",
    accent: "bg-emerald-900 text-stone-50",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade Profissional",
    desc: "Adubos 100% orgânicos formulados com matéria-prima da floresta.",
    accent: "bg-white text-stone-900 border border-stone-200",
    size: "md:col-span-1",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    desc: "Iranduba, Manaus e região metropolitana em até 48h.",
    accent: "bg-amber-700 text-white",
    size: "md:col-span-1",
  },
  {
    icon: Plant,
    title: "Suporte Técnico",
    desc: "Receita personalizada para cada tipo de cultivo ou jardim.",
    accent: "bg-stone-100 text-stone-900 border border-stone-200",
    size: "md:col-span-2",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative bg-stone-50 py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 items-end">
          <div className="md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-800">
              / 01 — Diferenciais
            </span>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              Quatro razões para escolher o
              <br />
              <span className="text-emerald-900">Adubo Amazônico</span>.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className={`${it.accent} ${it.size} p-8 md:p-10 flex flex-col justify-between min-h-[220px] hover:-translate-y-1 transition-transform`}
              >
                <Icon size={40} weight="duotone" />
                <div>
                  <h3 className="font-display text-2xl font-bold mb-3 mt-8">
                    {it.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90">{it.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
