import { useState, type FormEvent } from "react";
import { MapPin, Phone, EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { COMPANY_ADDRESS, COMPANY_EMAIL, WHATSAPP_PHONE, WHATSAPP_PHONE_2, waLink } from "@/lib/wa";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Verifique os campos do formulário.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
      return;
    }
    toast.success("Mensagem enviada! Entraremos em contato em breve.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contato" className="bg-stone-50 py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-800">/ 05 — Contato</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Vamos falar sobre o seu plantio.
          </h2>

          <div className="mt-12 space-y-8">
            <div className="flex gap-4">
              <MapPin size={28} weight="duotone" className="text-emerald-900 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Endereço</div>
                <div className="text-stone-900 font-medium">{COMPANY_ADDRESS}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={28} weight="duotone" className="text-emerald-900 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Telefones</div>
                <a href={waLink("Olá!", WHATSAPP_PHONE)} target="_blank" rel="noreferrer" className="block text-stone-900 font-medium hover:text-emerald-900 inline-flex items-center gap-2">
                  <WhatsappLogo size={16} weight="fill" /> (92) 99305-1106
                </a>
                <a href={waLink("Olá!", WHATSAPP_PHONE_2)} target="_blank" rel="noreferrer" className="block text-stone-900 font-medium hover:text-emerald-900 inline-flex items-center gap-2 mt-1">
                  <WhatsappLogo size={16} weight="fill" /> (92) 99501-0935
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <EnvelopeSimple size={28} weight="duotone" className="text-emerald-900 shrink-0 mt-1" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">Email</div>
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-stone-900 font-medium hover:text-emerald-900">{COMPANY_EMAIL}</a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-stone-200 p-8 md:p-10 space-y-6">
          {(["name", "email", "phone"] as const).map((f) => (
            <div key={f}>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-2">
                {f === "name" ? "Nome" : f === "email" ? "Email" : "Telefone (opcional)"}
              </label>
              <input
                type={f === "email" ? "email" : "text"}
                required={f !== "phone"}
                maxLength={f === "phone" ? 32 : f === "email" ? 255 : 120}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                className="w-full border-b border-stone-300 bg-transparent py-3 text-stone-900 placeholder:text-stone-400 focus:border-emerald-900 focus:outline-none transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-2">Mensagem</label>
            <textarea
              required
              maxLength={2000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border-b border-stone-300 bg-transparent py-3 text-stone-900 placeholder:text-stone-400 focus:border-emerald-900 focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-4 px-8 transition-colors disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>
      </div>
    </section>
  );
}
