import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";

const demoUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@aether.news",
    role: "admin",
  },
  {
    id: "2",
    name: "Sara Al-Hassan",
    email: "editor@aether.news",
    role: "editor",
  },
  {
    id: "3",
    name: "James Carter",
    email: "james@aether.news",
    role: "editor",
  },
  {
    id: "4",
    name: "Guest Reader",
    email: "reader@example.com",
    role: "user",
  },
];

export function UsersPage() {
  const { t } = useTranslation("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">{t("users")}</h1>
        <p className="text-sm text-muted mt-1">{t("userList")}</p>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="px-4 py-3 text-start font-semibold text-muted">Name</th>
              <th className="px-4 py-3 text-start font-semibold text-muted">Email</th>
              <th className="px-4 py-3 text-start font-semibold text-muted">{t("role")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {demoUsers.map((u) => (
              <tr key={u.id} className="hover:bg-surface/50">
                <td className="px-4 py-3 font-medium text-primary">{u.name}</td>
                <td className="px-4 py-3 text-muted">{u.email}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      u.role === "admin" ? "featured" : u.role === "editor" ? "accent" : "muted"
                    }
                  >
                    {u.role}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
