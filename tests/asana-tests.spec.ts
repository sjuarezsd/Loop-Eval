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
        await page.fill('input[name="email"]', 'ben+pose@workwithloop.com');
        await page.fill('input[name="password"]', 'Password123');
        await page.click('button[type="submit"]');
        await page.waitForNavigation();
      });

      // Navigate to the project page
      await test.step('Navigate to the project page', async () => {
        const [projectName, projectType] = data.leftNav.split(', ');
        await page.click(`text="${projectName}"`);
        await page.click(`text="${projectType}"`);
        await page.waitForNavigation();
      });

      // Verify the card is within the right column
      await test.step('Verify the card is within the right column', async () => {
        const columnLocator = page.locator(`text="${data.column}"`);
        await columnLocator.scrollIntoViewIfNeeded();
        const cardLocator = columnLocator.locator(`text="${data.card_title}"`);
        await expect(cardLocator).toBeVisible();
      });
    });
  });
});
