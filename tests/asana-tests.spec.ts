import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { TestCase } from '../types/types';

// Load the test cases from the JSON file
const testCases: TestCase[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../testCases.json'), 'utf8'));

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data: TestCase) => {
    test(data.name, async ({ page }) => {
      // Login to Asana
      await test.step('Login to Asana', async () => {
        await page.goto('https://app.asana.com/-/login');
        await page.fill('input[name="e"]', 'ben+pose@workwithloop.com');
        await page.locator('"Continue"').click();
        await page.fill('input[name="p"]', 'Password123');
        await page.locator('"Log in"').click();
      });

      // Navigate to the project page
      await test.step('Navigate to the project page', async () => {
        await page.click(`span.TypographyPresentation:has-text("${data.leftNav}")`);
      });

      // Verify the card is within the right column
      await test.step('Verify the card is within the right column', async () => {
        const columnLocator = page.locator(`div.BoardBody-columnDraggableItemWrapper.SortableList-sortableItemContainer:has-text("${data.column}")`);
        const cardLocator = columnLocator.locator(`span.TypographyPresentation.TypographyPresentation--m.BoardCard-taskName:has-text("${data.card_title}")`);
        await expect(cardLocator).toBeVisible();
      });
    });
  });
});
