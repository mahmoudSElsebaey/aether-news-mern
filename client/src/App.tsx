import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { HomePage } from "@/pages/HomePage";
import { ArticlePage } from "@/pages/ArticlePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { NewsListingPage } from "@/pages/NewsListingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsListingPage />} />
          <Route path="search" element={<NewsListingPage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path=":slug" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
