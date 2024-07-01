import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { TestCase } from '../types/types';
import { LoginPage } from '../pageObjects/loginPage';
import { ProjectPage } from '../pageObjects/projectPage';

// Load the test cases from the JSON file
const testCases: TestCase[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../testCases.json'), 'utf8'));

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data: TestCase) => {
    test(data.name, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const projectPage = new ProjectPage(page);

      // Login to Asana
      await test.step('Login to Asana', async () => {
        await loginPage.goto();
        await loginPage.login('ben+pose@workwithloop.com', 'Password123');
      });

      // Navigate to the project page
      await test.step('Navigate to the project page', async () => {
        await projectPage.navigateToProject(data.leftNav);
      });

      // Verify the card is within the right column
      await test.step('Verify the card is within the right column', async () => {
        await projectPage.verifyCardInColumn(data.column, data.card_title);
      });
    });
  });
});
