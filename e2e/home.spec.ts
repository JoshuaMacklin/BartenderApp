import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("displays app title", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bartender" })).toBeVisible();
  });

  test("has navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Explore Drinks" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Manage Inventory" })).toBeVisible();
  });

  test("navigates to drinks page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore Drinks" }).click();
    await expect(page).toHaveURL("/drinks");
  });
});
