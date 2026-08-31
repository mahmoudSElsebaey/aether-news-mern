import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { HomePage } from "@/pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          {/* Category routes (placeholders for Phase 2) */}
          <Route path="sports" element={<HomePage />} />
          <Route path="football" element={<HomePage />} />
          <Route path="technology" element={<HomePage />} />
          <Route path="business" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
