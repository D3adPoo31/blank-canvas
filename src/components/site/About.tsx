const ABOUT_IMG =
  "https://images.pexels.com/photos/5231243/pexels-photo-5231243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";

export function About() {
  return (
    <section id="sobre" className="bg-stone-100 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={ABOUT_IMG} alt="Agricultor segurando solo fértil" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-800">/ 03 — Sobre</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Da floresta para o seu solo, com responsabilidade.
          </h2>
          <p className="mt-8 text-stone-700 leading-relaxed text-lg">
            Há mais de uma década, o Adubo Amazônico nasceu em Iranduba — coração da
            Amazônia — com uma missão simples: levar a fertilidade lendária do solo
            amazônico para produtores, jardineiros e agricultores de todo o Brasil.
          </p>
          <p className="mt-4 text-stone-700 leading-relaxed">
            Trabalhamos com matéria-prima coletada de forma sustentável, processada
            em pequenos lotes e formulada para entregar nutrição de alta performance
            sem agredir o ecossistema que nos sustenta.
          </p>
        </div>
      </div>
    </section>
  );
}
