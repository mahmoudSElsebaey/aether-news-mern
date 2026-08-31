import { useState } from "react";
import { useTranslation } from "react-i18next";
import { categories as seedCategories } from "@/data/categories";
import type { Category } from "@/types/article";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function CategoriesPage() {
  const { t } = useTranslation("dashboard");
  const [list, setList] = useState<Category[]>(() => [...seedCategories]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [slug, setSlug] = useState("");

  const openCreate = () => {
    setCreating(true);
    setEditing(null);
    setNameEn("");
    setNameAr("");
    setDescEn("");
    setDescAr("");
    setSlug("");
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setCreating(false);
    setNameEn(cat.translations.en.name);
    setNameAr(cat.translations.ar.name);
    setDescEn(cat.translations.en.description || "");
    setDescAr(cat.translations.ar.description || "");
    setSlug(cat.slug);
  };

  const handleSave = () => {
    if (!nameEn.trim() || !nameAr.trim()) return;
    const payload: Category = {
      id: editing?.id || `cat-${Date.now()}`,
      slug: slug || nameEn.toLowerCase().replace(/\s+/g, "-"),
      translations: {
        en: { name: nameEn, description: descEn },
        ar: { name: nameAr, description: descAr },
      },
    };
    if (editing) {
      setList((prev) => prev.map((c) => (c.id === editing.id ? payload : c)));
    } else {
      setList((prev) => [...prev, payload]);
    }
    setEditing(null);
    setCreating(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm(t("confirmDelete"))) return;
    setList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("categories")}</h1>
          <p className="text-sm text-muted mt-1">{t("categoryList")}</p>
        </div>
        <Button variant="accent" onClick={openCreate}>
          {t("createCategory")}
        </Button>
      </div>

      {(creating || editing) && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4 max-w-2xl">
          <h2 className="font-semibold text-primary">
            {editing ? t("editCategory") : t("createCategory")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{t("nameEn")}</label>
              <input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("nameAr")}</label>
              <input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("descEn")}</label>
              <input
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t("descAr")}</label>
              <input
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm"
                dir="rtl"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium mb-1 block">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm font-mono"
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="accent" onClick={handleSave}>
              {t("save")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="px-4 py-3 text-start font-semibold text-muted">EN</th>
              <th className="px-4 py-3 text-start font-semibold text-muted">AR</th>
              <th className="px-4 py-3 text-start font-semibold text-muted">Slug</th>
              <th className="px-4 py-3 text-end font-semibold text-muted">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((cat) => (
              <tr key={cat.id} className="hover:bg-surface/50">
                <td className="px-4 py-3 font-medium text-primary">{cat.translations.en.name}</td>
                <td className="px-4 py-3" dir="rtl">
                  {cat.translations.ar.name}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="muted">{cat.slug}</Badge>
                </td>
                <td className="px-4 py-3 text-end space-x-2">
                  <button
                    type="button"
                    onClick={() => openEdit(cat)}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id)}
                    className="text-sm text-error hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
