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

## Personalizar contato

Edite `src/content.ts` e preencha `whatsapp`, `instagram` e `email`. O WhatsApp deve conter apenas números, incluindo o código do país e o DDD.

## Adicionar trabalhos

Coloque as imagens em `public/portfolio/` e adicione o nome do arquivo à lista `files` em `src/content.ts`.
