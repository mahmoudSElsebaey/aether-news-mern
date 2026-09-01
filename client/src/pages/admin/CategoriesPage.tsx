import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as categoriesApi from "@/services/categories.api";
import type { ApiCategory } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { PageLoader } from "@/components/ui/Spinner";

export function CategoriesPage() {
  const { t } = useTranslation("dashboard");
  const [list, setList] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ApiCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [slug, setSlug] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesApi.fetchCategories(true);
      setList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setCreating(true);
    setEditing(null);
    setNameEn("");
    setNameAr("");
    setDescEn("");
    setDescAr("");
    setSlug("");
  };

  const openEdit = (cat: ApiCategory) => {
    setEditing(cat);
    setCreating(false);
    setNameEn(cat.translations.en.name);
    setNameAr(cat.translations.ar.name);
    setDescEn(cat.translations.en.description || "");
    setDescAr(cat.translations.ar.description || "");
    setSlug(cat.slug);
  };

  const handleSave = async () => {
    if (!nameEn.trim() || !nameAr.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        translations: {
          en: { name: nameEn, description: descEn },
          ar: { name: nameAr, description: descAr },
        },
        slug: slug || undefined,
      };
      if (editing) {
        await categoriesApi.updateCategory(editing._id, payload);
      } else {
        await categoriesApi.createCategory(payload);
      }
      setEditing(null);
      setCreating(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await categoriesApi.deleteCategory(deleteId);
      setDeleteId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <PageLoader />;

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

      {error && (
        <p className="text-sm text-error bg-error/10 rounded-xl px-3 py-2">{error}</p>
      )}

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
            <Button variant="accent" onClick={handleSave} isLoading={saving}>
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
              <tr key={cat._id} className="hover:bg-surface/50">
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
                    onClick={() => setDeleteId(cat._id)}
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

      <ConfirmModal
        open={!!deleteId}
        title={t("deleteArticle")}
        message={t("confirmDelete")}
        confirmLabel={t("deleteArticle")}
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
