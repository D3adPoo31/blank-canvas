import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { formatBRL, waLink } from "@/lib/wa";
import { Trash, WhatsappLogo, ArrowLeft } from "@phosphor-icons/react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Adubo Amazônico" },
      { name: "description", content: "Finalize seu pedido pelo WhatsApp." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, setQuantity, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    const payload = items.map((i) => ({
      id: i.id,
      name: i.name,
      weight: i.weight,
      price: Number(i.price),
      quantity: i.quantity,
    }));

    const { error } = await supabase.from("orders").insert({
      customer_name: form.name,
      customer_phone: form.phone,
      customer_address: form.address || null,
      notes: form.notes || null,
      items: payload,
      total,
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível registrar o pedido.");
      return;
    }

    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.name}${i.weight ? ` (${i.weight})` : ""} — ${formatBRL(i.price * i.quantity)}`,
    );
    const msg = `Olá! Quero finalizar este pedido:\n\n${lines.join("\n")}\n\n*Total:* ${formatBRL(total)}\n\n*Nome:* ${form.name}\n*Telefone:* ${form.phone}${form.address ? `\n*Endereço:* ${form.address}` : ""}${form.notes ? `\n*Obs:* ${form.notes}` : ""}`;
    clear();
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="font-display font-extrabold text-xl text-emerald-900">
            Adubo<span className="text-amber-600">.</span>Amazônico
          </Link>
          <Link to="/" className="text-sm text-stone-600 inline-flex items-center gap-2 hover:text-emerald-900">
            <ArrowLeft size={16} /> Voltar à loja
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-[1fr_380px] gap-12">
        <div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-8">Seu carrinho</h1>
          {items.length === 0 ? (
            <div className="bg-white border border-stone-200 p-12 text-center text-stone-500">
              Seu carrinho está vazio.{" "}
              <Link to="/" className="text-emerald-900 font-semibold underline">Voltar ao catálogo</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.id} className="bg-white border border-stone-200 p-4 flex gap-4 items-center">
                  <img src={i.image_url} alt={i.name} className="w-20 h-20 object-cover" />
                  <div className="flex-1">
                    <div className="font-display font-bold text-stone-900">{i.name}{i.weight && <span className="text-stone-500"> — {i.weight}</span>}</div>
                    <div className="text-sm text-emerald-900 font-semibold mt-1">{formatBRL(i.price)}</div>
                  </div>
                  <input
                    type="number" min={1} value={i.quantity}
                    onChange={(e) => setQuantity(i.id, parseInt(e.target.value) || 1)}
                    className="w-16 border border-stone-300 px-2 py-2 text-center"
                  />
                  <button onClick={() => remove(i.id)} className="text-stone-500 hover:text-red-600 p-2" aria-label="Remover">
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="bg-white border border-stone-200 p-6 h-fit lg:sticky lg:top-8">
          <h2 className="font-display text-xl font-bold text-stone-900 mb-6">Finalizar pelo WhatsApp</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input required maxLength={120} placeholder="Seu nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-b border-stone-300 bg-transparent py-3 focus:border-emerald-900 focus:outline-none" />
            <input required maxLength={32} placeholder="Telefone com DDD" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border-b border-stone-300 bg-transparent py-3 focus:border-emerald-900 focus:outline-none" />
            <input maxLength={500} placeholder="Endereço (opcional)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border-b border-stone-300 bg-transparent py-3 focus:border-emerald-900 focus:outline-none" />
            <textarea maxLength={2000} rows={2} placeholder="Observações (opcional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border-b border-stone-300 bg-transparent py-3 focus:border-emerald-900 focus:outline-none resize-none" />
            <div className="flex justify-between items-baseline pt-4 border-t border-stone-200">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">Total</span>
              <span className="font-display text-3xl font-bold text-emerald-900">{formatBRL(total)}</span>
            </div>
            <button type="submit" disabled={loading || items.length === 0} className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-4 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50">
              <WhatsappLogo size={20} weight="fill" /> {loading ? "Enviando..." : "Enviar pedido"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
