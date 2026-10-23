// Bootstrap 5.0 ships no type declarations; the app only hands it to the theme's scripts.
declare module "bootstrap/dist/js/bootstrap.bundle.min.js" {
  const bootstrap: Readonly<Record<string, unknown>> | undefined;
  export default bootstrap;
}
