import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { medhaRoutes, NotFoundPage } from "./medha/routes";
import { ComponentExplorerPage } from "./pages/ComponentExplorerPage";

/**
 * Every route of the app. The Medha theme provides the landing site (/), sign-in (/login),
 * registration (/register), the dashboard (/dashboard) and one page per component
 * (/dashboard/...). Add your own pages here.
 */
export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {medhaRoutes.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path="/dashboard/components" element={<ComponentExplorerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
