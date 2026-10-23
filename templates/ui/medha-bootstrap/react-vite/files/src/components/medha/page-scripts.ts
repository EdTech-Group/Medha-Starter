import type { PageScript } from "../../medha/theme";

export type PageScriptOptions = {
  /** Class of <body> while the page is shown. */
  readonly bodyClass: string;
  /** Page stylesheets (CSS text), added to <head> in order. */
  readonly styles: readonly string[];
  readonly scripts: readonly PageScript[];
};

type Registration = readonly [
  target: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions | undefined,
];

/**
 * Gives a page what its static HTML page had in the Medha theme: its <body> class, its
 * stylesheets, and its scripts run against the freshly rendered markup. The returned cleanup
 * undoes all of it, so moving between pages behaves like loading a new HTML page:
 *
 * - listeners the scripts add to `document` and `window`, and their timers, are removed;
 * - elements they (or Bootstrap) append to <body>, such as modal backdrops, are removed;
 * - the page stylesheets are removed and the <body> class and style are restored.
 *
 * Scripts that wait for `DOMContentLoaded` or `load` run straight away: the document is loaded.
 */
export function runPageScripts({ bodyClass, styles, scripts }: PageScriptOptions): () => void {
  const { body, head } = document;
  const previousClass = body.getAttribute("class");
  const previousStyle = body.getAttribute("style");
  body.className = bodyClass;

  const styleElements = styles.map((css) => {
    const element = document.createElement("style");
    element.dataset.medhaPage = "";
    element.textContent = css;
    head.append(element);
    return element;
  });

  const appended: Node[] = [];
  const collect = (records: MutationRecord[]) => {
    for (const record of records) appended.push(...record.addedNodes);
  };
  const observer = new MutationObserver(collect);
  observer.observe(body, { childList: true });

  const listeners: Registration[] = [];
  const timers: number[] = [];
  const stopTracking = trackGlobals(listeners, timers);
  try {
    for (const script of scripts) {
      try {
        script();
      } catch (error) {
        console.error("A Medha theme script failed:", error);
      }
    }
  } finally {
    stopTracking();
  }

  return () => {
    collect(observer.takeRecords());
    observer.disconnect();
    for (const [target, type, listener, options] of listeners) {
      target.removeEventListener(type, listener, options);
    }
    // clearTimeout also clears intervals: both share one list of ids.
    for (const id of timers) clearTimeout(id);
    for (const node of appended) {
      if (node.parentNode === body) body.removeChild(node);
    }
    for (const element of styleElements) element.remove();
    restoreAttribute(body, "class", previousClass);
    restoreAttribute(body, "style", previousStyle);
  };
}

/** Records global listeners and timers created while the scripts run synchronously. */
function trackGlobals(listeners: Registration[], timers: number[]): () => void {
  const ready: (() => void)[] = [];
  const targets: EventTarget[] = [document, window];
  // Some environments define addEventListener on the object itself; put back exactly what was there.
  const descriptors = targets.map((target) =>
    Object.getOwnPropertyDescriptor(target, "addEventListener"),
  );

  for (const target of targets) {
    const original = target.addEventListener;
    target.addEventListener = (type, listener, options) => {
      if (!listener) return;
      const loaded =
        (target === document && type === "DOMContentLoaded") ||
        (target === window && type === "load");
      if (loaded) {
        ready.push(() => {
          const event = new Event(type);
          if (typeof listener === "function") listener.call(target, event);
          else listener.handleEvent(event);
        });
        return;
      }
      listeners.push([target, type, listener, options]);
      original.call(target, type, listener, options);
    };
  }

  const originalTimeout = window.setTimeout;
  const originalInterval = window.setInterval;
  window.setTimeout = ((...args: Parameters<typeof setTimeout>) => {
    const id = originalTimeout(...args);
    timers.push(id);
    return id;
  }) as typeof setTimeout;
  window.setInterval = ((...args: Parameters<typeof setInterval>) => {
    const id = originalInterval(...args);
    timers.push(id);
    return id;
  }) as typeof setInterval;

  return () => {
    // Callbacks for an already-loaded document run last, while still tracked.
    for (const callback of ready.splice(0)) {
      try {
        callback();
      } catch (error) {
        console.error("A Medha theme script failed:", error);
      }
    }
    targets.forEach((target, index) => {
      const descriptor = descriptors[index];
      if (descriptor) Object.defineProperty(target, "addEventListener", descriptor);
      // No own property before: removing ours brings back EventTarget.prototype's.
      else Reflect.deleteProperty(target, "addEventListener");
    });
    window.setTimeout = originalTimeout;
    window.setInterval = originalInterval;
  };
}

function restoreAttribute(element: Element, name: string, value: string | null): void {
  if (value === null) element.removeAttribute(name);
  else element.setAttribute(name, value);
}
