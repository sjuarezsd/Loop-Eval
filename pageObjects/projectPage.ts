import { Page, expect } from '@playwright/test';

export class ProjectPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProject(leftNav: string) {
    await this.page.click(`span.TypographyPresentation:has-text("${leftNav}")`);
  }

  async verifyCardInColumn(column: string, cardTitle: string) {
    const columnLocator = this.page.locator(`div.BoardBody-columnDraggableItemWrapper.SortableList-sortableItemContainer:has-text("${column}")`);
    const cardLocator = columnLocator.locator(`span.TypographyPresentation.TypographyPresentation--m.BoardCard-taskName:has-text("${cardTitle}")`);
    await expect(cardLocator).toBeVisible();
  }
}
