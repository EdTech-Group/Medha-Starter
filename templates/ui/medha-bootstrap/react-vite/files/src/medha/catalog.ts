// Ported from the Medha theme by medha-starter. Every theme page, grouped as in the sidebar. Drives the component explorer.
import type { IconName } from "./icons";

export type CatalogItem = {
  readonly path: string;
  readonly label: string;
  readonly icon: IconName;
  readonly description: string;
  /** Page component in src/medha/pages/. */
  readonly component: string;
};

export type CatalogSection = { readonly section: string; readonly items: readonly CatalogItem[] };

export const CATALOG: readonly CatalogSection[] = [
  {
    section: "Workspace",
    items: [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: "grid",
        description: "A clear view of your devices, data, and network health.",
        component: "DashboardPage",
      },
    ],
  },
  {
    section: "Components",
    items: [
      {
        path: "/dashboard/buttons",
        label: "Buttons & badges",
        icon: "cursor",
        description: "Buttons, badges, alerts and navigation in the Medha palette.",
        component: "ButtonsPage",
      },
      {
        path: "/dashboard/grids",
        label: "Grids",
        icon: "layout",
        description: "Responsive layout grid.",
        component: "GridsPage",
      },
      {
        path: "/dashboard/typography",
        label: "Typography",
        icon: "type",
        description: "Type, lists, quotes and the colour palette.",
        component: "TypographyPage",
      },
      {
        path: "/dashboard/icons",
        label: "Icons",
        icon: "star",
        description: "Inline SVG icon sprite.",
        component: "IconsPage",
      },
      {
        path: "/dashboard/general",
        label: "General elements",
        icon: "settings",
        description:
          "Contextual panels, modals, tabs, tooltips, popovers, scrollspy and accordion.",
        component: "GeneralPage",
      },
      {
        path: "/dashboard/media",
        label: "Media objects",
        icon: "user",
        description: "Avatar and text layouts.",
        component: "MediaPage",
      },
      {
        path: "/dashboard/widgets",
        label: "Widgets",
        icon: "grid",
        description:
          "Report, contacts, activity timeline, progress table, mini calendar and stats.",
        component: "WidgetsPage",
      },
      {
        path: "/dashboard/tree",
        label: "Tree diagram",
        icon: "share",
        description: "Collapsible tree view and organisation-chart tree diagram.",
        component: "TreePage",
      },
      {
        path: "/dashboard/tree-editor",
        label: "Tree editor",
        icon: "edit",
        description:
          "Add, rename, reorder, drag-and-drop and delete nodes with a live diagram, undo/redo and JSON import/export.",
        component: "TreeEditorPage",
      },
      {
        path: "/dashboard/uml-editor",
        label: "UML editor",
        icon: "layout",
        description: "Structural and behavioral UML diagrams — 14 types in one editor.",
        component: "UmlEditorPage",
      },
      {
        path: "/dashboard/math-editor",
        label: "MathML editor",
        icon: "type",
        description:
          "Equation editor with LaTeX input, symbol palette for every category of mathematics, live MathML preview and export.",
        component: "MathEditorPage",
      },
      {
        path: "/dashboard/vedic-editor",
        label: "Vedic editor",
        icon: "file",
        description:
          "Type Vedic Sanskrit phonetically — svara marks, visarga and anusvara signs, Samaveda numerals — with an on-screen keyboard.",
        component: "VedicEditorPage",
      },
      {
        path: "/dashboard/colors",
        label: "Colour schemes",
        icon: "settings",
        description:
          "Choose a complementary, analogous, triadic, tetradic, split-complementary or monochromatic scheme for the whole theme.",
        component: "ColorsPage",
      },
      {
        path: "/dashboard/codes",
        label: "Short codes",
        icon: "layout",
        description:
          "Breadcrumbs, pagination, badges, wells, button groups, input groups and alerts.",
        component: "CodesPage",
      },
    ],
  },
  {
    section: "Bootstrap Kit",
    items: [
      {
        path: "/dashboard/navigation",
        label: "Navigation",
        icon: "menu",
        description: "Navs, tabs, pills, breadcrumbs and responsive navbars.",
        component: "NavigationPage",
      },
      {
        path: "/dashboard/cards",
        label: "Cards & lists",
        icon: "layout",
        description: "Content cards, image cards, card groups and list groups.",
        component: "CardsPage",
      },
      {
        path: "/dashboard/feedback",
        label: "Feedback",
        icon: "alert",
        description: "Alerts, progress bars, spinners and toast notifications.",
        component: "FeedbackPage",
      },
      {
        path: "/dashboard/carousels",
        label: "Carousels & accordions",
        icon: "image",
        description:
          "Sliders with controls, indicators, captions and collapsible accordion panels.",
        component: "CarouselsPage",
      },
    ],
  },
  {
    section: "Website",
    items: [
      { path: "/", label: "Home", icon: "home", description: "", component: "SiteHomePage" },
      {
        path: "/about",
        label: "About",
        icon: "users",
        description: "",
        component: "SiteAboutPage",
      },
      {
        path: "/services",
        label: "Services",
        icon: "award",
        description: "",
        component: "SiteServicesPage",
      },
      {
        path: "/gallery",
        label: "Gallery",
        icon: "image",
        description: "",
        component: "SiteGalleryPage",
      },
      {
        path: "/contact",
        label: "Contact",
        icon: "mail",
        description: "",
        component: "SiteContactPage",
      },
    ],
  },
  {
    section: "Apps",
    items: [
      {
        path: "/dashboard/inbox",
        label: "Inbox",
        icon: "mail",
        description: "Messages grouped by day.",
        component: "InboxPage",
      },
      {
        path: "/dashboard/compose",
        label: "Compose",
        icon: "edit",
        description: "Write a new message.",
        component: "ComposePage",
      },
    ],
  },
  {
    section: "Forms & Data",
    items: [
      {
        path: "/dashboard/inputs",
        label: "Inputs",
        icon: "form",
        description: "Text fields, selects, checks, switches and form layouts.",
        component: "InputPage",
      },
      {
        path: "/dashboard/validation",
        label: "Validation",
        icon: "check",
        description: "Bootstrap validation states.",
        component: "ValidationPage",
      },
      {
        path: "/dashboard/tables",
        label: "Tables",
        icon: "table",
        description: "Basic, striped, bordered and coloured-row tables.",
        component: "TablePage",
      },
      {
        path: "/dashboard/charts",
        label: "Charts",
        icon: "chart",
        description: "Line, bar, donut, stacked, combo, scatter and dual-axis charts.",
        component: "ChartsPage",
      },
      {
        path: "/dashboard/calendar",
        label: "Calendar",
        icon: "calendar",
        description: "Maintenance and event schedule (sample).",
        component: "CalendarPage",
      },
      {
        path: "/dashboard/editor",
        label: "Editor",
        icon: "edit",
        description:
          "Rich text (WYSIWYG) editor with formatting, links, images, tables and HTML source view.",
        component: "EditorPage",
      },
    ],
  },
  {
    section: "Pages",
    items: [
      {
        path: "/login",
        label: "Sign in",
        icon: "lock",
        description: "Welcome back to the Medha IoT console.",
        component: "SignInPage",
      },
      {
        path: "/register",
        label: "Sign up",
        icon: "user",
        description: "Set up your Medha IoT workspace.",
        component: "SignUpPage",
      },
      {
        path: "/dashboard/faq",
        label: "FAQ",
        icon: "help",
        description: "Frequently asked questions.",
        component: "FaqPage",
      },
      {
        path: "/dashboard/blank",
        label: "Blank page",
        icon: "file",
        description: "Start building here.",
        component: "BlankPage",
      },
      {
        path: "/404",
        label: "Error 404",
        icon: "alert",
        description: "The page you are looking for does not exist.",
        component: "NotFoundPage",
      },
      {
        path: "/500",
        label: "Error 500",
        icon: "alert",
        description: "We hit an unexpected error. Please try again shortly.",
        component: "ServerErrorPage",
      },
    ],
  },
];
