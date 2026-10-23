import { afterEach, describe, expect, test, vi } from "vitest";
import { runPageScripts } from "./page-scripts";

afterEach(() => {
  document.body.className = "";
  vi.useRealTimers();
});

describe("runPageScripts", () => {
  test("sets the body class and page styles, and restores both", () => {
    document.body.className = "before";
    const cleanup = runPageScripts({ bodyClass: "site", styles: ["p{margin:0}"], scripts: [] });
    expect(document.body.className).toBe("site");
    expect(document.head.querySelector("style[data-medha-page]")?.textContent).toBe("p{margin:0}");

    cleanup();
    expect(document.body.className).toBe("before");
    expect(document.head.querySelector("style[data-medha-page]")).toBeNull();
  });

  test("removes global listeners and timers the scripts added", () => {
    vi.useFakeTimers();
    const onKey = vi.fn();
    const onTick = vi.fn();
    const cleanup = runPageScripts({
      bodyClass: "",
      styles: [],
      scripts: [
        () => {
          document.addEventListener("keydown", onKey);
          setInterval(onTick, 10);
        },
      ],
    });

    document.dispatchEvent(new KeyboardEvent("keydown"));
    vi.advanceTimersByTime(25);
    expect(onKey).toHaveBeenCalledTimes(1);
    expect(onTick).toHaveBeenCalledTimes(2);

    cleanup();
    document.dispatchEvent(new KeyboardEvent("keydown"));
    vi.advanceTimersByTime(25);
    expect(onKey).toHaveBeenCalledTimes(1);
    expect(onTick).toHaveBeenCalledTimes(2);
  });

  test("leaves window and document able to take listeners afterwards", () => {
    const onResize = vi.fn();
    const cleanup = runPageScripts({
      bodyClass: "",
      styles: [],
      scripts: [() => window.addEventListener("resize", onResize)],
    });
    cleanup();
    window.dispatchEvent(new Event("resize"));
    expect(onResize).not.toHaveBeenCalled();

    const later = vi.fn();
    window.addEventListener("resize", later);
    document.addEventListener("click", later);
    window.dispatchEvent(new Event("resize"));
    document.dispatchEvent(new Event("click"));
    expect(later).toHaveBeenCalledTimes(2);
    window.removeEventListener("resize", later);
    document.removeEventListener("click", later);
  });

  test("runs DOMContentLoaded handlers at once and removes elements added to <body>", async () => {
    const ready = vi.fn();
    const cleanup = runPageScripts({
      bodyClass: "",
      styles: [],
      scripts: [
        () => {
          document.addEventListener("DOMContentLoaded", ready);
          document.body.append(Object.assign(document.createElement("div"), { id: "popup" }));
        },
      ],
    });
    expect(ready).toHaveBeenCalledTimes(1);
    expect(document.getElementById("popup")).not.toBeNull();

    cleanup();
    expect(document.getElementById("popup")).toBeNull();
  });

  test("keeps going when a script throws", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const after = vi.fn();
    const cleanup = runPageScripts({
      bodyClass: "",
      styles: [],
      scripts: [
        () => {
          throw new Error("broken");
        },
        after,
      ],
    });
    expect(after).toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
    cleanup();
    error.mockRestore();
  });
});
