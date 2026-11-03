import { NewProjectForm } from "@/components/client-area/new-project-form";

export const metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">New project</h1>
        <p className="text-muted-foreground">
          Tell us about the project so we can prepare a budget.
        </p>
      </div>
      <NewProjectForm />
    </div>
  );
}
