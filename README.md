# WS Design — Portfólio

Portfólio interativo para divulgação de flyers de eventos.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
```

Os arquivos prontos para publicação ficam em `dist/`.

## Deploy na Vercel

1. Na Vercel, escolha **Add New → Project**.
2. Importe o repositório `ereiasofc-cell/portifolio-flyers`.
3. A configuração será detectada automaticamente pelo `vercel.json`:
   - Framework: Vite
   - Instalação: `npm ci`
   - Build: `npm run build`
   - Saída: `dist`
4. Clique em **Deploy**.

Os próximos pushes no branch `main` gerarão novos deploys automaticamente.

## Personalizar contato

Edite `src/content.ts` e preencha `whatsapp`, `instagram` e `email`. O WhatsApp deve conter apenas números, incluindo o código do país e o DDD.

## Adicionar trabalhos

Coloque as imagens em `public/portfolio/` e adicione o nome do arquivo à lista `files` em `src/content.ts`.
