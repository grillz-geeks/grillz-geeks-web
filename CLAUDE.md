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

Existem **dois sistemas de idioma diferentes** no projeto — um para o site público, outro para a plataforma logada. Eles não se misturam.

**Site público** (`src/app/[locale]/...`, tudo que não é `/app/...`): inglês por padrão, com opção de português, feitos à mão com a biblioteca `next-intl`:
- Inglês (`en`) é o padrão e não aparece na URL (ex: `grillzgeeks.com/services/b2b`).
- Português (`pt`) aparece com prefixo (ex: `grillzgeeks.com/pt/services/b2b`).
- Textos traduzíveis ficam em `messages/en.json` e `messages/pt.json`.

**Plataforma logada** (`src/app/app/...`, Área do cliente): sempre em **inglês, escrito direto no código** (sem next-intl, sem arquivo de tradução). Para outros idiomas, veja "Idioma da plataforma" na seção "Área do cliente" abaixo.

Por isso a pasta `src/app/app/` fica **fora** de `src/app/[locale]/`, como uma rota de primeiro nível — é o mesmo motivo de `src/app/auth/confirm` também ficar fora.

## Estrutura de páginas (fase atual)

As páginas do **site público** já existem como estrutura vazia (só título e um aviso de "em construção", sem texto final nem visual): Home, Services (B2B com subpáginas de CAD/Cases/Como funciona/Contato, e B2C), FAQ, Works (portfólio + página de case), Custom Grillz, Academy (com cursos, depoimentos e matrícula), Design your Grillz / Design your client's Grillz, About e Contact.

A **Área administrativa** (`/admin/...`) ainda não foi criada — fica para quando decidirmos como diferenciar perfil de cliente e de time interno (ver "Login" abaixo).

A **Área do cliente** (`/app/...`) já existe, com dados fictícios (ver "Área do cliente" abaixo).

## Login

Já existem as páginas de **login, criar conta e recuperar senha** (`/login`, `/register`, `/forgot-password`, `/reset-password`), usando **Supabase Auth**. Enquanto as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` não estiverem configuradas no `.env.local` (ou na Vercel em produção), essas páginas mostram um aviso de "login ainda não disponível" em vez de dar erro — o resto do site continua funcionando normalmente.

Depois de logar, a pessoa cai em `/app/projects` (Área do cliente). **Ainda não existe diferença entre perfil de cliente e perfil de time interno** — quem cria conta em `/register` não vira automaticamente nem cliente nem interno; essa parte fica para quando a Thais decidir como isso deve funcionar. Por enquanto, todo mundo logado cai na Área do cliente.

## Área do cliente

Rotas protegidas em `/app/...` (`src/app/app/`, **fora** do `[locale]` — ver "Idioma" acima). O layout (`src/app/app/layout.tsx`) exige login — quem não está logado é redirecionado para `/login` automaticamente.

- `/app/projects` — Meus projetos (lista de orçamentos/projetos)
- `/app/projects/new` — Criar novo projeto (fluxo de orçamento)
- `/app/projects/[id]` — Detalhes do projeto (abas: Visão geral — que já inclui Tarefas —, e Documentos)
- `/app/payments` — Pagamentos (saldo devedor, histórico, pagar pendências)
- `/app/account` — Dados da conta (perfil, senha, idioma, time/aprovadores)

**Os dados exibidos são fictícios** (`src/lib/mock/projects.ts`, `src/lib/mock/payments.ts`) — nada ainda está ligado a uma tabela de verdade no Supabase. Os formulários (criar projeto, alterar dados, alterar senha, adicionar time) ainda não salvam nada de verdade, são só a tela. Isso é esperado nesta fase — ligar ao banco de dados é um próximo passo, depois que o visual for aprovado.

### Pagamentos

A tela de Pagamentos (`/app/payments`) simula o fluxo com o **Stripe** (que ainda não está integrado de verdade). Mostra saldo devedor, total pago, e por projeto: status (pago / a vencer / atrasado) e um botão "Pay" que simula o pagamento só localmente (sem cobrar nada, sem rede) — ver `src/components/client-area/payments-table.tsx`.

### Idioma da plataforma

A plataforma é **sempre escrita em inglês**. Para outros idiomas, a pessoa troca em **Dados da conta → Language**, usando o **widget do Google Tradutor** (gratuito, de terceiros) — não é next-intl, e cobre qualquer idioma que o Google Tradutor tiver, não só os que a gente decidiu traduzir à mão.

- `src/lib/google-translate.ts` — lista de idiomas e funções para ler/trocar o idioma atual (via cookie `googtrans`, que é como o widget do Google funciona).
- `src/components/client-area/google-translate-loader.tsx` — carrega o script do Google uma vez (escondido, sem a barrinha padrão deles).
- `src/components/client-area/language-picker.tsx` — o seletor em Dados da conta.

Importante: é tradução automática, **não revisada por humano** — a qualidade varia por idioma. E depende do Google continuar oferecendo esse widget gratuito do jeito que é hoje (é um serviço não-oficial/não documentado oficialmente pelo Google, mas amplamente usado).

## Identidade visual e design system

A identidade visual já existe: **azul e branco**, baseada na logo (azul principal `#0c2266`), **sem amarelo na plataforma**. A fonte é **Manrope** (Google Fonts).

Os componentes de interface vêm do **shadcn/ui** (`src/components/ui/`), configurados em `components.json`. As cores ficam como tokens CSS em `src/app/globals.css` (formato `oklch`), todos derivados do azul da marca — por isso tudo combina entre si automaticamente. Para ver tudo isso aplicado, visite `/style-guide` (página interna, não faz parte do site — só para conferência visual).

As logos (SVG) ficam em `public/brand/`: `logo-mark.svg` (símbolo azul/branco, usado na plataforma) e `logo-full.svg` (versão colorida com amarelo, não usar na plataforma).

**Regra importante**: sempre que precisar de um componente de interface novo (botão, modal, dropdown, checkbox, etc.), **buscar no shadcn/ui** (`npx shadcn@latest add <componente>`) em vez de escrever do zero. Só criar um componente customizado quando o shadcn realmente não tiver nada parecido. Atenção: este projeto usa o shadcn com **Base UI** (não Radix) — para um `Button` virar outro elemento (ex: um link), usa-se `render={<Link ... />}` + `nativeButton={false}`, não o `asChild` do Radix.

## Ainda não decidido

- **Conteúdo final** das páginas (textos, imagens de verdade) — por enquanto é tudo placeholder/estrutura, baseado só no sitemap.

Por isso: **não invente** textos finais de página nem imagens reais. Quando for necessário decidir algo assim, pergunte antes.

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
