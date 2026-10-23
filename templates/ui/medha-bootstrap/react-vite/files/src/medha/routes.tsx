// Ported from the Medha theme by medha-starter. One route per page of the theme.
import { type ComponentType, type LazyExoticComponent, lazy } from "react";

export type MedhaRoute = {
  readonly path: string;
  /** The page's document title. */
  readonly title: string;
  readonly Page: LazyExoticComponent<ComponentType>;
};

export const medhaRoutes: readonly MedhaRoute[] = [
  {
    path: "/dashboard",
    title: "Medha IoT • Operations dashboard",
    Page: lazy(() => import("./pages/DashboardPage")),
  },
  {
    path: "/dashboard/buttons",
    title: "Buttons & badges • Medha IoT",
    Page: lazy(() => import("./pages/ButtonsPage")),
  },
  {
    path: "/dashboard/grids",
    title: "Grids • Medha IoT",
    Page: lazy(() => import("./pages/GridsPage")),
  },
  {
    path: "/dashboard/typography",
    title: "Typography • Medha IoT",
    Page: lazy(() => import("./pages/TypographyPage")),
  },
  {
    path: "/dashboard/icons",
    title: "Icons • Medha IoT",
    Page: lazy(() => import("./pages/IconsPage")),
  },
  {
    path: "/dashboard/general",
    title: "General elements • Medha IoT",
    Page: lazy(() => import("./pages/GeneralPage")),
  },
  {
    path: "/dashboard/media",
    title: "Media objects • Medha IoT",
    Page: lazy(() => import("./pages/MediaPage")),
  },
  {
    path: "/dashboard/widgets",
    title: "Widgets • Medha IoT",
    Page: lazy(() => import("./pages/WidgetsPage")),
  },
  {
    path: "/dashboard/tree",
    title: "Tree diagram • Medha IoT",
    Page: lazy(() => import("./pages/TreePage")),
  },
  {
    path: "/dashboard/tree-editor",
    title: "Tree diagram editor • Medha IoT",
    Page: lazy(() => import("./pages/TreeEditorPage")),
  },
  {
    path: "/dashboard/uml-editor",
    title: "UML diagram editor • Medha IoT",
    Page: lazy(() => import("./pages/UmlEditorPage")),
  },
  {
    path: "/dashboard/math-editor",
    title: "MathML editor • Medha IoT",
    Page: lazy(() => import("./pages/MathEditorPage")),
  },
  {
    path: "/dashboard/vedic-editor",
    title: "Vedic Sanskrit editor • Medha IoT",
    Page: lazy(() => import("./pages/VedicEditorPage")),
  },
  {
    path: "/dashboard/colors",
    title: "Colour schemes • Medha IoT",
    Page: lazy(() => import("./pages/ColorsPage")),
  },
  {
    path: "/dashboard/codes",
    title: "Short codes • Medha IoT",
    Page: lazy(() => import("./pages/CodesPage")),
  },
  {
    path: "/dashboard/navigation",
    title: "Navigation • Medha IoT",
    Page: lazy(() => import("./pages/NavigationPage")),
  },
  {
    path: "/dashboard/cards",
    title: "Cards & lists • Medha IoT",
    Page: lazy(() => import("./pages/CardsPage")),
  },
  {
    path: "/dashboard/feedback",
    title: "Feedback • Medha IoT",
    Page: lazy(() => import("./pages/FeedbackPage")),
  },
  {
    path: "/dashboard/carousels",
    title: "Carousels & accordions • Medha IoT",
    Page: lazy(() => import("./pages/CarouselsPage")),
  },
  { path: "/", title: "Home • Medha", Page: lazy(() => import("./pages/SiteHomePage")) },
  { path: "/about", title: "About • Medha", Page: lazy(() => import("./pages/SiteAboutPage")) },
  {
    path: "/services",
    title: "Services • Medha",
    Page: lazy(() => import("./pages/SiteServicesPage")),
  },
  {
    path: "/gallery",
    title: "Gallery • Medha",
    Page: lazy(() => import("./pages/SiteGalleryPage")),
  },
  {
    path: "/contact",
    title: "Contact • Medha",
    Page: lazy(() => import("./pages/SiteContactPage")),
  },
  {
    path: "/dashboard/inbox",
    title: "Inbox • Medha IoT",
    Page: lazy(() => import("./pages/InboxPage")),
  },
  {
    path: "/dashboard/compose",
    title: "Compose • Medha IoT",
    Page: lazy(() => import("./pages/ComposePage")),
  },
  {
    path: "/dashboard/inputs",
    title: "Inputs • Medha IoT",
    Page: lazy(() => import("./pages/InputPage")),
  },
  {
    path: "/dashboard/validation",
    title: "Validation • Medha IoT",
    Page: lazy(() => import("./pages/ValidationPage")),
  },
  {
    path: "/dashboard/tables",
    title: "Tables • Medha IoT",
    Page: lazy(() => import("./pages/TablePage")),
  },
  {
    path: "/dashboard/charts",
    title: "Charts • Medha IoT",
    Page: lazy(() => import("./pages/ChartsPage")),
  },
  {
    path: "/dashboard/calendar",
    title: "Calendar • Medha IoT",
    Page: lazy(() => import("./pages/CalendarPage")),
  },
  {
    path: "/dashboard/editor",
    title: "Editor • Medha IoT",
    Page: lazy(() => import("./pages/EditorPage")),
  },
  { path: "/login", title: "Sign in • Medha IoT", Page: lazy(() => import("./pages/SignInPage")) },
  {
    path: "/register",
    title: "Sign up • Medha IoT",
    Page: lazy(() => import("./pages/SignUpPage")),
  },
  { path: "/dashboard/faq", title: "FAQ • Medha IoT", Page: lazy(() => import("./pages/FaqPage")) },
  {
    path: "/dashboard/blank",
    title: "Blank page • Medha IoT",
    Page: lazy(() => import("./pages/BlankPage")),
  },
  {
    path: "/404",
    title: "Page not found • Medha IoT",
    Page: lazy(() => import("./pages/NotFoundPage")),
  },
  {
    path: "/500",
    title: "Server error • Medha IoT",
    Page: lazy(() => import("./pages/ServerErrorPage")),
  },
];

/** Shown for paths no route matches. */
export const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
