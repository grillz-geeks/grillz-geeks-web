import Image from "next/image";
import type { ReactNode } from "react";

type ComingSoonProps = {
  /** Etiqueta pequena acima do título (ex: "Em breve"). */
  tag: string;
  /** Título principal da página. */
  title: string;
  /** Frase curta embaixo do título. */
  body: string;
  /** Botões/links opcionais embaixo do texto. */
  children?: ReactNode;
};

/**
 * Página simples de "em breve", usada na Home e no Order your Grillz
 * enquanto o conteúdo final do site não existe.
 */
export function ComingSoon({ tag, title, body, children }: ComingSoonProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <Image
        src="/brand/logo-mark.svg"
        alt="Grillz Geeks"
        width={96}
        height={78}
        priority
      />
      <p className="text-sm font-medium tracking-widest text-primary uppercase">
        {tag}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-prose text-muted-foreground">{body}</p>
      {children}
    </main>
  );
}
