import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function handleDialog(
  page: Page,
  action: () => Promise<void>,
  expectedMessage?: string,
) {
  await Promise.all([
    page.waitForEvent("dialog").then(async (dialog) => {
      if (expectedMessage) {
        expect(dialog.message()).toContain(expectedMessage);
      }
      await dialog.accept();
    }),
    action(),
  ]);
}
