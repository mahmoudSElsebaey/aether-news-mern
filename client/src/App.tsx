import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { HomePage } from "@/pages/HomePage";
import { ArticlePage } from "@/pages/ArticlePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { NewsListingPage } from "@/pages/NewsListingPage";
import { LocaleRedirect } from "@/components/routing/LocaleRedirect";
import { LocaleSync } from "@/components/routing/LocaleSync";

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
    <BrowserRouter>
      <Routes>
        {/* Locale-prefixed app */}
        <Route path=":lang" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsListingPage />} />
          <Route path="search" element={<NewsListingPage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path=":slug" element={<CategoryPage />} />
        </Route>

        {/* Redirect root and legacy paths to localized URLs */}
        <Route path="/" element={<LocaleRedirect />} />
        <Route path="*" element={<LocaleRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
