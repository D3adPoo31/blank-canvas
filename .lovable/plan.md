## Diagnóstico

O erro listado faz referência a três arquivos que **já não existem** no projeto:
- `src/components/site/Catalog.tsx`
- `src/components/site/Contact.tsx`
- `src/routes/checkout.tsx`

Eles foram removidos no turno anterior, quando limpamos o projeto para deixar apenas uma tela em branco. O projeto hoje só tem `src/routes/__root.tsx` e `src/routes/index.tsx`.

A mensagem que aparece é de um build antigo em cache — o código atual está limpo e não tem nada para corrigir.

## Plano

1. Tocar (`touch`) o `src/routes/index.tsx` para invalidar o cache e disparar um rebuild.
2. Confirmar que o build passa sem erros.

Nenhuma mudança de código é necessária.
