import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

// Bootstrap's JavaScript (dropdowns, modals, offcanvas sidebar, tooltips). The theme's scripts use
// it through the `bootstrap` global, as the static theme loaded it with a <script> tag; bundlers
// load the file as a module, so the global is set here.
if (bootstrap) Object.assign(window, { bootstrap });
