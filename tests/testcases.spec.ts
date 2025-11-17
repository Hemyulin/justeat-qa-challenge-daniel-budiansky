import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://careers.justeattakeaway.com/global/en/home");
  const cookieAccept = page.getByRole("button", { name: /Accept all/i });
  if (await cookieAccept.isVisible()) {
    await cookieAccept.click();
  }
});

test("Test case 1", async ({ page }) => {
  // Open https://careers.justeattakeaway.com/global/en/home

  // Search for the Job Title “Test”
  await page.locator('[placeholder="Search for job title"]').fill("Test");

  // Do not enter a location, “Search” for results
  await page
    .locator('[data-ps="1a1b2be7-span-34"]')
    .getByRole("button", { name: "Search" })
    .click();
  page.locator('[data-ps="0949aad0-h1-1"]:text-is("search jobs")');

  let filteredJobs = await page
    .locator('[data-ph-at-id="heading-text"]', {
      hasText: "results for",
    })
    .innerText();

  const numberOfGlobalFilteredJobs: number = Number(
    filteredJobs.match(/\d+/)?.[0] ?? 0
  );

  const jobList = page.locator('[data-ph-at-id="jobs-list"]');
  const globalJobCount = await jobList.count();

  const locations: string[] = [];

  const iterateOverJobList = async () => {
    for (let i = 0; i < globalJobCount; i++) {
      const job = jobList.nth(i);

      const locLocator = job.locator(
        '[data-ph-at-id="job-location"][role="text"]'
      );

      if ((await locLocator.count()) === 0) {
        continue;
      }

      const rawLocation = await locLocator.innerText();
      const cleanLocation = rawLocation.replace("Location :", "").trim();
      locations.push(cleanLocation);
    }
  };
  await iterateOverJobList();
  expect(new Set(locations).size).toBeGreaterThan(1);

  locations.length = 0;

  // Then Refine your search from the left panel to the Country “Netherlands”
  await page.locator("#CountryAccordion").click();
  await page.getByRole("checkbox", { name: /Netherlands/i }).check();

  const netherlandsFilterTag = page.locator(".facet-tag");
  await expect(netherlandsFilterTag).toBeVisible();

  await expect(
    page.locator('[data-ph-at-id="heading-text"]', { hasText: /results for/i })
  ).not.toHaveText(filteredJobs);

  const filteredAfter = await page
    .locator('[data-ph-at-id="heading-text"]', {
      hasText: /results for/i,
    })
    .innerText();

  // Verify that now the search results’ location is the Netherlands only
  const countWithNLFilter = Number(filteredAfter.match(/\d+/)?.[0] ?? 0);

  expect(countWithNLFilter).toBeLessThan(numberOfGlobalFilteredJobs);

  await iterateOverJobList();
  expect(new Set(locations).size).toEqual(1);
});

test.only("Test case 2", async ({ page }) => {
  // Open https://careers.justeattakeaway.com/global/en/home

  // Click on “Search for Job Title” and select “Sales” among Job Categories
  await page.locator('[placeholder="Search for job title"]').click();
  page.getByLabel("Search suggestions");
  await page.getByRole("option", { name: "Sales" }).click();

  // Scroll to “Refine your search”
  page.getByText("Refine your search");

  // Verify Category “Sales” is selected and the search results number is matching
  const salesCheckbox = page.getByRole("checkbox", { name: /Sales/i });
  await expect(salesCheckbox).toBeChecked();

  const salesCheckboxText = await page.getByText("Sales (").innerText();
  const numberOfSalesJobs = Number(salesCheckboxText.match(/\d+/));

  const resultCount = await page
    .locator('[data-ph-at-id="jobs-list-header"] .result-count')
    .innerText();
  const resultCountNumber = Number(resultCount);

  expect(numberOfSalesJobs).toEqual(resultCountNumber);

  // Then Refine your search from the left panel to the Country “Germany”
  await page.locator("#CountryAccordion").click();

  const germanyLabel = page
    .locator('fieldset:has(legend:text("Country"))')
    .locator('label:has-text("Germany")');
  await germanyLabel.click();
  const germanyCheckbox = page.getByRole("checkbox", { name: /Germany/i });

  await expect(germanyCheckbox).toBeChecked();

  //   Verify the number of the search results is matching and category is “Sales” on all results
  const germanyLabelInnerText = await germanyLabel.innerText();
  const numberOfSalesJobsInGermany = Number(germanyLabelInnerText.match(/\d+/));
  console.log(numberOfSalesJobsInGermany);
});
