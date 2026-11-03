import { LanguagePicker } from "@/components/client-area/language-picker";
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
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Account details" };

/**
 * Os formulários de perfil e senha ainda não salvam de verdade — a
 * ideia aqui é só a tela. "Add" (time) também é só visual por
 * enquanto (ver src/components/client-area/team-section.tsx).
 */
export default async function ClientAccountPage() {
  const userEmail = isSupabaseConfigured()
    ? (await (await createClient()).auth.getUser()).data.user?.email
    : undefined;

  return (
    <div className="max-w-2xl space-y-6 p-8">
      <h1 className="text-2xl font-semibold">Account details</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="account-name">Name</Label>
            <Input id="account-name" name="name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="account-email">Email</Label>
            <Input
              id="account-email"
              name="email"
              type="email"
              defaultValue={userEmail ?? ""}
              disabled
            />
          </div>
          <Button type="button">Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Password</CardTitle>
          <CardDescription>Change the password you use to log in.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-password">Current password</Label>
            <Input id="current-password" name="currentPassword" type="password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-password">New password</Label>
            <Input id="new-password" name="newPassword" type="password" />
          </div>
          <Button type="button">Update password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Language</CardTitle>
          <CardDescription>
            The platform is in English by default. Pick another language and
            we translate the screen automatically (powered by Google
            Translate — not reviewed by a human, so quality varies by
            language).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LanguagePicker />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team</CardTitle>
          <CardDescription>
            People who can also approve budgets and designs for this account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamSection />
        </CardContent>
      </Card>
    </div>
  );
}
