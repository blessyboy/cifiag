import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/layout/Layout";
import { ContentPage } from "./pages/ContentPage";
import { MembershipPage } from "./pages/MembershipPage";
import { NewsPage } from "./pages/NewsPage";
import { ProgramPage } from "./pages/ProgramPage";
import { SearchPage } from "./pages/SearchPage";
import "./styles/global.css";

/**
 * Programs and membership categories have dedicated templates. Every other
 * path, including static siblings such as /programs/outlines, is a CMS page.
 * React Router ranks static segments above dynamic ones.
 */
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/search", element: <SearchPage /> },
      { path: "/programs/outlines", element: <ContentPage /> },
      { path: "/programs/registration-fees", element: <ContentPage /> },
      { path: "/programs/:slug", element: <ProgramPage /> },
      { path: "/membership/:slug", element: <MembershipPage /> },
      { path: "/news/:slug", element: <NewsPage /> },
      { path: "*", element: <ContentPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
