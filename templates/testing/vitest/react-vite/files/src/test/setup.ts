import "../components/medha/bootstrap";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom does not implement these browser APIs; the theme's editors use them. Real browsers do.
if (!("innerText" in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, "innerText", {
    configurable: true,
    get(this: HTMLElement) {
      return this.textContent ?? "";
    },
    set(this: HTMLElement, value: string) {
      this.textContent = value;
    },
  });
}
if (typeof document.execCommand !== "function") {
  Object.assign(document, {
    execCommand: () => false,
    queryCommandState: () => false,
    queryCommandValue: () => "",
    queryCommandSupported: () => false,
  });
}

afterEach(() => {
  cleanup();
});
