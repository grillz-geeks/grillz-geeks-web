import { useTranslations } from "next-intl";

type PlaceholderPageProps = {
  /** Caminho da rota, só para facilitar identificar a página durante o desenvolvimento. */
  path: string;
  /** Título traduzido da página (vem do arquivo de mensagens en/pt). */
  title: string;
};

/**
 * Página "vazia" usada enquanto o conteúdo final e a identidade visual
 * da Grillz Geeks ainda não existem. Serve só para marcar a estrutura
 * de rotas do site — nenhum texto aqui é definitivo.
 */
export function PlaceholderPage({ path, title }: PlaceholderPageProps) {
  const t = useTranslations("Common");

  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-2 p-8">
      <p className="font-mono text-xs text-neutral-400">{path}</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-prose text-sm text-neutral-500">
        {t("placeholderNote")}
      </p>
    </main>
  );
}
