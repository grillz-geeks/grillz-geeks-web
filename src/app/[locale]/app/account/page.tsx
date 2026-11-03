import { getTranslations } from "next-intl/server";
import { TeamSection } from "@/components/client-area/team-section";
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
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata() {
  const t = await getTranslations("ClientArea.Account");
  return { title: t("title") };
}

/**
 * Os formulários de perfil e senha ainda não salvam de verdade — a
 * ideia aqui é só a tela. "Adicionar time" também é só visual por
 * enquanto (ver src/components/client-area/team-section.tsx).
 */
export default async function ClientAccountPage() {
  const t = await getTranslations("ClientArea.Account");
  const userEmail = isSupabaseConfigured()
    ? (await (await createClient()).auth.getUser()).data.user?.email
    : "previa@grillzgeeks.com";

  return (
    <div className="max-w-2xl space-y-6 p-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("profileTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="account-name">{t("nameLabel")}</Label>
            <Input id="account-name" name="name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="account-email">{t("emailLabel")}</Label>
            <Input
              id="account-email"
              name="email"
              type="email"
              defaultValue={userEmail ?? ""}
              disabled
            />
          </div>
          <Button type="button">{t("saveChanges")}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("passwordTitle")}</CardTitle>
          <CardDescription>{t("passwordHint")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-password">{t("currentPasswordLabel")}</Label>
            <Input id="current-password" name="currentPassword" type="password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-password">{t("newPasswordLabel")}</Label>
            <Input id="new-password" name="newPassword" type="password" />
          </div>
          <Button type="button">{t("updatePassword")}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("teamTitle")}</CardTitle>
          <CardDescription>{t("teamHint")}</CardDescription>
        </CardHeader>
        <CardContent>
          <TeamSection />
        </CardContent>
      </Card>
    </div>
  );
}
