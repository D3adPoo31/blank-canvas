import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "Vocês entregam em toda a região metropolitana de Manaus?", a: "Sim. Atendemos Iranduba, Manaus e cidades vizinhas em até 48h úteis. Para outras regiões, consulte pelo WhatsApp." },
  { q: "Os adubos são 100% orgânicos?", a: "Sim. Trabalhamos com matéria-prima da floresta, processada em pequenos lotes e sem aditivos químicos." },
  { q: "Vocês oferecem suporte técnico?", a: "Oferecemos consulta gratuita para indicar a quantidade e o tipo ideal para cada cultivo ou jardim." },
  { q: "Como faço para comprar?", a: "Adicione os produtos ao carrinho e finalize pelo WhatsApp, ou fale direto com um especialista pelo botão no topo da página." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-800">/ 04 — FAQ</span>
        <h2 className="mt-4 mb-12 font-display text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">Perguntas frequentes.</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-stone-200">
              <AccordionTrigger className="text-left font-display text-lg font-semibold text-stone-900 hover:no-underline py-6">{f.q}</AccordionTrigger>
              <AccordionContent className="text-stone-600 leading-relaxed pb-6">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
