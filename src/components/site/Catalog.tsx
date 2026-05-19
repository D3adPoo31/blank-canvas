import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { waLink, formatBRL } from "@/lib/wa";
import { toast } from "sonner";
import {
  WhatsappLogo,
  Package,
  ShoppingCartSimple,
  ChatCircleText,
} from "@phosphor-icons/react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  weight: string | null;
  is_on_request: boolean;
};

export function Catalog() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    supabase
      .from("products")
      .select(
        "id, name, description, price, image_url, category, stock, weight, is_on_request",
      )
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setItems((data as Product[]) || []);
        setLoading(false);
      });
  }, []);

  const handleAdd = (p: Product) => {
    add(
      {
        id: p.id,
        name: p.name,
        price: Number(p.price),
        image_url: p.image_url,
        weight: p.weight,
      },
      1,
    );
    toast.success(
      `${p.name}${p.weight ? ` (${p.weight})` : ""} adicionado ao carrinho`,
    );
  };

  return (
    <section id="catalogo" className="bg-white py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-800">
            / 02 — Catálogo
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Produtos que fazem seu
            <br /> plantio prosperar.
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center text-stone-500">
            Carregando produtos...
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-stone-500 border border-dashed border-stone-300">
            Nenhum produto cadastrado ainda. Acesse o painel admin para adicionar
            produtos.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((p) => {
              const onRequest = p.is_on_request;
              const waText = `Olá, gostaria de consultar a disponibilidade e o prazo de entrega para o produto ${p.name}${p.weight ? ` de ${p.weight}` : ""}.`;
              return (
                <article
                  key={p.id}
                  className="group bg-stone-50 border border-stone-200 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-200 relative">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {onRequest && (
                      <span className="absolute top-3 left-3 bg-emerald-900 text-amber-300 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                        Sob Consulta
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider bg-emerald-100 text-emerald-900">
                        Orgânico {p.weight ? `• ${p.weight}` : ""}
                      </span>
                      <span
                        className={`text-xs font-medium flex items-center gap-1 ${p.stock > 0 ? "text-emerald-700" : "text-red-600"}`}
                      >
                        <Package size={14} weight="bold" />
                        {p.stock > 0 ? `${p.stock} un` : "Esgotado"}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-stone-900 mb-2 tracking-tight">
                      {p.name}
                      {p.weight && (
                        <span className="text-stone-500"> — {p.weight}</span>
                      )}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed flex-1">
                      {p.description}
                    </p>

                    <div className="flex items-end justify-between mt-6 pt-6 border-t border-stone-200 gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                          {onRequest ? "Preço" : "A partir de"}
                        </div>
                        <div className="font-display text-2xl font-bold text-emerald-900">
                          {onRequest ? "Sob consulta" : formatBRL(Number(p.price))}
                        </div>
                      </div>

                      {onRequest ? (
                        <a
                          href={waLink(waText)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold py-2.5 px-4 transition-colors"
                        >
                          <ChatCircleText weight="fill" size={16} />
                          Consultar
                        </a>
                      ) : (
                        <button
                          onClick={() => handleAdd(p)}
                          disabled={p.stock <= 0}
                          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 px-4 transition-colors"
                        >
                          <ShoppingCartSimple weight="fill" size={16} />
                          Comprar
                        </button>
                      )}
                    </div>

                    {!onRequest && (
                      <a
                        href={waLink(
                          `Olá! Tenho interesse no produto: ${p.name}${p.weight ? ` (${p.weight})` : ""}`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 text-xs text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1.5 font-semibold"
                      >
                        <WhatsappLogo weight="fill" size={14} />
                        Tirar dúvida no WhatsApp
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
