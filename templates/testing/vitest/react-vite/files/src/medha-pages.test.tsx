import { screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { medhaRoutes } from "./medha/routes";
import { renderAt } from "./test/render";

afterEach(() => {
  vi.restoreAllMocks();
});

// Every page of the Medha theme renders and its scripts start without throwing.
describe.each(medhaRoutes)("$path", ({ path, title }) => {
  test("renders", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    renderAt(path);
    await waitFor(() => expect(document.title).toBe(title));
    expect(screen.getAllByRole("main").length).toBeGreaterThan(0);
    const failures = errors.mock.calls.filter(([message]) =>
      String(message).startsWith("A Medha theme script failed"),
    );
    expect(failures.map(([, error]) => String(error))).toEqual([]);
  });
});
