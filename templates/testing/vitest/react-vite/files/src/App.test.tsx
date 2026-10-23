import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { renderAt } from "./test/render";

describe("routes", () => {
  test("the landing page uses the website layout", async () => {
    renderAt("/");
    expect(await screen.findAllByRole("link", { name: /contact/i })).not.toHaveLength(0);
    expect(document.body.className).toBe("site");
  });

  test("sign-in and registration pages show their forms", async () => {
    renderAt("/login");
    expect(await screen.findByRole("heading", { name: "Sign in" })).toBeTruthy();
    expect(document.body.className).toBe("auth-page");
  });

  test("workspace pages render inside the sidebar layout", async () => {
    renderAt("/dashboard/blank");
    expect(await screen.findByRole("heading", { level: 1, name: "Blank page" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Component explorer" })).toBeTruthy();
    expect(document.title).toBe("Blank page • Medha IoT");
  });

  test("unknown paths show the not-found page", async () => {
    renderAt("/no-such-page");
    expect(await screen.findByRole("heading", { name: "Page not found" })).toBeTruthy();
  });
});

describe("component explorer", () => {
  test("lists pages by section and switches tabs", async () => {
    renderAt("/dashboard/components");
    const tabs = await screen.findAllByRole("tab");
    expect(tabs.length).toBeGreaterThan(1);

    const website = screen.getByRole("tab", { name: /website/i });
    fireEvent.click(website);
    await waitFor(() => expect(website.getAttribute("aria-selected")).toBe("true"));
    expect(screen.getByRole("tabpanel").textContent).toContain("Contact");
  });

  test("filters the selected section", async () => {
    renderAt("/dashboard/components?tab=components");
    fireEvent.change(await screen.findByLabelText("Filter pages"), { target: { value: "tree" } });
    const panel = screen.getByRole("tabpanel");
    expect(panel.textContent).toContain("Tree diagram");
    expect(panel.textContent).not.toContain("Buttons");
  });
});
