import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Style guide — Grillz Geeks",
};

const colorTokens = [
  { name: "background", className: "bg-background border" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "border", className: "bg-border" },
  { name: "destructive", className: "bg-destructive" },
];

/**
 * Página interna (não faz parte do site) só para conferir visualmente
 * as cores, a fonte e os componentes de base antes de usá-los nas
 * telas de verdade. Pode ser removida mais pra frente.
 */
export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 p-8">
      <header className="space-y-4">
        <Image
          src="/brand/logo-mark.svg"
          alt="Grillz Geeks"
          width={69}
          height={56}
          priority
        />
        <div>
          <h1 className="text-3xl font-bold">Style guide — Grillz Geeks</h1>
          <p className="text-muted-foreground">
            Página interna para conferir a identidade aplicada: cores,
            fonte (Manrope) e componentes base do shadcn/ui.
          </p>
        </div>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cores</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colorTokens.map((token) => (
            <div key={token.name} className="space-y-2">
              <div className={`h-16 rounded-lg ${token.className}`} />
              <p className="font-mono text-xs text-muted-foreground">
                {token.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tipografia (Manrope)</h2>
        <div className="space-y-2">
          <p className="text-4xl font-bold">Heading grande 4xl bold</p>
          <p className="text-2xl font-semibold">Heading médio 2xl semibold</p>
          <p className="text-lg font-medium">Texto destaque lg medium</p>
          <p className="text-base">Texto padrão base — parágrafo normal.</p>
          <p className="text-sm text-muted-foreground">
            Texto secundário sm, cor muted-foreground.
          </p>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Botões e badges</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destrutivo</Button>
          <Button disabled>Desabilitado</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Padrão</Badge>
          <Badge variant="secondary">Secundário</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destrutivo</Badge>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Formulário</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Exemplo de card</CardTitle>
            <CardDescription>Com campos de formulário dentro.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="exemplo-nome">Nome</Label>
              <Input id="exemplo-nome" placeholder="Seu nome" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="exemplo-email">Email</Label>
              <Input id="exemplo-email" type="email" placeholder="voce@exemplo.com" />
            </div>
            <Button className="w-full">Enviar</Button>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Avatares</h2>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Exemplo" />
            <AvatarFallback>GG</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tabs</h2>
        <Tabs defaultValue="visao-geral" className="max-w-md">
          <TabsList>
            <TabsTrigger value="visao-geral">Visão geral</TabsTrigger>
            <TabsTrigger value="cliente">Cliente</TabsTrigger>
            <TabsTrigger value="producao">Produção</TabsTrigger>
          </TabsList>
          <TabsContent value="visao-geral" className="text-sm text-muted-foreground">
            Conteúdo de exemplo da aba &quot;Visão geral&quot;.
          </TabsContent>
          <TabsContent value="cliente" className="text-sm text-muted-foreground">
            Conteúdo de exemplo da aba &quot;Cliente&quot;.
          </TabsContent>
          <TabsContent value="producao" className="text-sm text-muted-foreground">
            Conteúdo de exemplo da aba &quot;Produção&quot;.
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tabela</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#1234</TableCell>
              <TableCell>Loja Exemplo</TableCell>
              <TableCell>
                <Badge variant="secondary">Em produção</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#1235</TableCell>
              <TableCell>Outra Loja</TableCell>
              <TableCell>
                <Badge>Entregue</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
