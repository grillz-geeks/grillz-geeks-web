# Grillz Geeks — guia do projeto

Este arquivo explica o projeto para quem for ajudar no código (incluindo assistentes de IA). Leia antes de mexer em qualquer coisa.

## O que é o projeto

Site institucional e, depois, plataforma de projetos da **Grillz Geeks** (grillz). É feito por **duas product designers que não programam**, cada uma trabalhando no seu próprio Mac. Por isso, tudo deve ser simples de rodar, explicado em português claro, e nada deve depender de conhecimento técnico prévio.

## Tecnologia

- **Next.js** — framework do site (TypeScript, Tailwind CSS, ESLint, App Router, pasta `src`).
- **Supabase** — banco de dados, login de usuários e armazenamento de arquivos.
- **Vercel** — hospedagem do site.
- **Resend** — envio de e-mails (contato, notificações, etc.).
- **Stripe** e **Mercado Pago** — pagamentos (serão adicionados mais tarde).
- **Podia** — hospeda o curso (Academy) fora deste código. Aqui no site existe só a vitrine/divulgação do Academy, não o curso em si.

## Páginas do site

Fase 1 — site institucional (público):
- Home
- Services (B2B e B2C)
- Orçamento
- Works / Portfólio
- Academy (vitrine do curso, que roda no Podia)
- About
- Contact
- FAQ
- Rodapé (footer)

Fase 2 — plataforma logada (depois do site):
- Login com dois perfis: **cliente** (área do cliente) e **interno** (área da equipe).

## Idioma

O site é em **inglês por padrão**, com **opção de tradução para português**. Isso é feito com a biblioteca `next-intl`:

- Inglês (`en`) é o idioma padrão e não aparece na URL (ex: `grillzgeeks.com/services/b2b`).
- Português (`pt`) aparece com prefixo na URL (ex: `grillzgeeks.com/pt/services/b2b`).
- As páginas ficam dentro de `src/app/[locale]/...` e os textos traduzíveis ficam em `messages/en.json` e `messages/pt.json`.

## Estrutura de páginas (fase atual)

As páginas do **site público** já existem como estrutura vazia (só título e um aviso de "em construção", sem texto final nem visual): Home, Services (B2B com subpáginas de CAD/Cases/Como funciona/Contato, e B2C), FAQ, Works (portfólio + página de case), Custom Grillz, Academy (com cursos, depoimentos e matrícula), Design your Grillz / Design your client's Grillz, About e Contact.

A **área do cliente** (`/app/...`) e a **área administrativa** (`/admin/...`) ainda não foram criadas — ficam para quando decidirmos como diferenciar perfil de cliente e de time interno (ver "Login" abaixo).

## Login

Já existem as páginas de **login, criar conta e recuperar senha** (`/login`, `/register`, `/forgot-password`, `/reset-password`), usando **Supabase Auth**. Enquanto as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` não estiverem configuradas no `.env.local` (ou na Vercel em produção), essas páginas mostram um aviso de "login ainda não disponível" em vez de dar erro — o resto do site continua funcionando normalmente.

Depois de logar, a pessoa cai numa página genérica em `/account` (só mostra o email dela e um botão de sair) — isso é temporário, só para provar que o login funciona. **Ainda não existe diferença entre perfil de cliente e perfil de time interno** — quem cria conta em `/register` não vira automaticamente nem cliente nem interno; essa parte fica para quando a Thais decidir como isso deve funcionar.

## Ainda não decidido

- **Identidade visual** (logo, cores, fontes, imagens) ainda não foi adicionada ao projeto.

Por isso: **não invente** paleta de cores, fontes nem textos finais de página. Quando for necessário decidir algo assim, pergunte antes.

## Regras de trabalho

- **Segredos nunca vão para o repositório.** Senhas, chaves de API e dados de clientes ficam só no arquivo `.env.local` (que é ignorado pelo Git). Só o `.env.example` (com os nomes das variáveis, sem nenhum valor) é enviado ao GitHub.
- **Ninguém mexe direto na branch `main`.** Todo trabalho é feito em uma branch separada e enviado por Pull Request (PR) para revisão.
- **Commits pequenos e com mensagem clara**, explicando o que mudou e por quê.
- **Explicações sempre em português simples.** Evite jargão técnico sem explicar; se usar um termo técnico, diga o que ele significa.
- **Perguntar antes de decisões grandes** (arquitetura, bibliotecas novas, textos finais, identidade visual, idioma, fluxos de pagamento, etc.). Decisões pequenas e reversíveis podem seguir sem perguntar, mas sempre explicando o que foi feito.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
