import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { LocaleRedirect } from "@/components/routing/LocaleRedirect";
import { LocaleSync } from "@/components/routing/LocaleSync";
import { HomePage } from "@/pages/HomePage";
import { ArticlePage } from "@/pages/ArticlePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { NewsListingPage } from "@/pages/NewsListingPage";
import { LoginPage } from "@/pages/admin/LoginPage";
import { OverviewPage } from "@/pages/admin/OverviewPage";
import { ArticlesPage } from "@/pages/admin/ArticlesPage";
import { ArticleEditorPage } from "@/pages/admin/ArticleEditorPage";
import { CategoriesPage } from "@/pages/admin/CategoriesPage";
import { UsersPage } from "@/pages/admin/UsersPage";
import { MediaPage } from "@/pages/admin/MediaPage";
import { AnalyticsPage } from "@/pages/admin/AnalyticsPage";
import { SettingsPage } from "@/pages/admin/SettingsPage";

function LocaleLayout() {
  return (
    <>
      <LocaleSync />
      <PublicLayout />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin (no locale prefix) */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin", "editor"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverviewPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="articles/new" element={<ArticleEditorPage />} />
            <Route path="articles/:id/edit" element={<ArticleEditorPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route
              path="users"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route path="media" element={<MediaPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Public locale-prefixed app */}
          <Route path=":lang" element={<LocaleLayout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsListingPage />} />
            <Route path="search" element={<NewsListingPage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path=":slug" element={<CategoryPage />} />
          </Route>

          <Route path="/" element={<LocaleRedirect />} />
          <Route path="*" element={<LocaleRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
