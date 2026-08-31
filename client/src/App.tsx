import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { LocaleRedirect } from "@/components/routing/LocaleRedirect";
import { LocaleSync } from "@/components/routing/LocaleSync";
import { isLocale } from "@/utils/locale";
import { HomePage } from "@/pages/HomePage";
import { ArticlePage } from "@/pages/ArticlePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { NewsListingPage } from "@/pages/NewsListingPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LoginPage } from "@/pages/admin/LoginPage";
import { RegisterPage } from "@/pages/admin/RegisterPage";
import { OverviewPage } from "@/pages/admin/OverviewPage";
import { ArticlesPage } from "@/pages/admin/ArticlesPage";
import { ArticleEditorPage } from "@/pages/admin/ArticleEditorPage";
import { CategoriesPage } from "@/pages/admin/CategoriesPage";
import { UsersPage } from "@/pages/admin/UsersPage";
import { MediaPage } from "@/pages/admin/MediaPage";
import { AnalyticsPage } from "@/pages/admin/AnalyticsPage";
import { SettingsPage } from "@/pages/admin/SettingsPage";

function LocaleLayout() {
  const { lang } = useParams();
  if (!isLocale(lang)) {
    return <Navigate to="/en" replace />;
  }
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
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
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

          <Route path=":lang" element={<LocaleLayout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsListingPage />} />
            <Route path="search" element={<NewsListingPage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path=":slug" element={<CategoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/" element={<LocaleRedirect />} />
          <Route path="*" element={<LocaleRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
