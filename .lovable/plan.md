## O que será construído

Clone fiel do site **Adubo Amazônico** — uma loja de adubos orgânicos de Iranduba-AM, com landing page, catálogo dinâmico, carrinho que finaliza pedido via WhatsApp, e painel administrativo para gerenciar produtos.

## Stack

- **Frontend**: TanStack Start (React) + Tailwind, design tokens do projeto original (verde-esmeralda + âmbar + pedra/stone, tipografia "Cabinet Grotesk"-like / Manrope, cantos retos `rounded-none`, estética orgânica/editorial).
- **Backend**: **Lovable Cloud** (substitui o backend Python/FastAPI/Mongo original). Banco para produtos + pedidos + autenticação de admin nativa.
- **Ícones**: `@phosphor-icons/react` (mesmos do original).

## Páginas / Rotas

```
/                  Landing (Hero, Diferenciais, Catálogo, Sobre, FAQ, Contato, Footer)
/checkout          Resumo do carrinho + envio do pedido via WhatsApp
/admin/login       Login do administrador
/admin             Dashboard: CRUD de produtos
```

## Seções da landing

1. **Header fixo** — logo "Adubo.Amazônico", nav (Diferenciais, Catálogo, Sobre, FAQ, Contato), botão WhatsApp, ícone do carrinho. Transparente sobre o hero, sólido após scroll.
2. **Hero** — imagem da floresta amazônica em full-bleed, overlay escuro, headline "Nutrição de **alta** performance com raízes amazônicas", CTAs "Ver catálogo" e "Falar com um especialista", stats (12+ anos, 40+ produtos, 100% origem amazônica).
3. **Diferenciais** — bento grid assimétrico (4 cards: Origem Amazônica, Qualidade Profissional, Entrega Rápida, Suporte Técnico).
4. **Catálogo** — filtros (Todos / Orgânicos), grid de cards de produto com imagem, badge, nome, descrição, preço (ou "Sob consulta"), estoque, botão "Comprar" (adiciona ao carrinho) ou "Consultar" (WhatsApp), link "Tirar dúvida no WhatsApp".
5. **Sobre** — split 50/50 imagem (agricultor/solo) + texto da história da marca.
6. **FAQ** — accordion com perguntas frequentes.
7. **Contato** — endereço (Ramal Pico Bela, Iranduba-AM), telefones, email, formulário (salva no banco).
8. **Footer** — fundo `emerald-950`, brand grande, links e copyright.

## Carrinho + Checkout

- Estado do carrinho via React Context + `localStorage` (sem necessidade de backend).
- Botão de carrinho no header com contador.
- Página `/checkout`: lista itens, quantidades editáveis, total, campos de nome/telefone/endereço; botão "Finalizar pelo WhatsApp" monta uma mensagem formatada com os itens e abre `wa.me`. Pedido também é salvo no banco para o admin ver.

## Admin

- `/admin/login` com email/senha (auth nativa do Lovable Cloud).
- Tabela `user_roles` separada + função `has_role` + RLS para gating de admin (padrão seguro).
- `/admin` (protegido): tabela de produtos com criar/editar/excluir via dialog (shadcn Table + Dialog), upload de imagem por URL.
- Lista de pedidos recebidos (somente leitura).

## Esquema do banco (Lovable Cloud)

- `products` — id, name, description, price, image_url, category, stock, weight, is_on_request, created_at. RLS: leitura pública; escrita só admin.
- `orders` — id, customer_name, customer_phone, customer_address, items (jsonb), total, status, created_at. RLS: insert público; leitura só admin.
- `contact_messages` — id, name, email, phone, message, created_at. RLS: insert público; leitura só admin.
- `user_roles` — id, user_id, role (`admin`). RLS padrão.
- Função `has_role(user_id, role)` (security definer).

## Configurações fornecidas (do código original)

- Telefones WhatsApp: (92) 99305-1106 / (92) 99501-0935
- Email: adubodamazonia@gmail.com
- Endereço: Ramal Pico Bela, CEP 69.415-000, Iranduba-AM
- Chave Pix: a definir (no código original vinha de env — vou deixar editável no admin ou em um arquivo de config)

## Detalhes técnicos

- Tailwind `src/styles.css` com tokens semânticos no formato `oklch` para a paleta (emerald-900 primário, amber-700 accent, stone neutros), fontes via Google Fonts (Manrope + um display geométrico tipo "Cabinet Grotesk" — usarei **Sora** ou **Space Grotesk** como substituto).
- Imagens do hero/sobre baixadas/referenciadas pelas mesmas URLs do Unsplash/Pexels do original.
- Roteamento file-based em `src/routes/` (uma rota por página, com `head()` próprio para SEO de cada uma — index, checkout, admin/login, admin).
- Server functions (`createServerFn`) para CRUD de produtos, criação de pedido e mensagens de contato; admin gates usam `requireSupabaseAuth` + checagem de role.
- `attachSupabaseAuth` registrado em `src/start.ts`.

## Fora de escopo (a não ser que peça)

- Pagamento online (o fluxo do original também é via WhatsApp, sem checkout pago).
- Logs de auditoria, rate limiting customizado, lockout de login do backend Python (Lovable Cloud já oferece proteção básica de auth).
- Domínio próprio / envio de email transacional.

## Próximos passos

Após você aprovar:
1. Habilito o Lovable Cloud e crio o esquema do banco.
2. Construo a landing completa.
3. Construo carrinho + checkout.
4. Construo o admin (login + CRUD).
5. Insiro produtos de exemplo (3–6 itens) para você ver funcionando, depois você pode editar/adicionar pelo admin.
