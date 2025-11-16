import { test } from '@playwright/test'

test('Test case 1', async ({page}) => {
    await page.goto('https://careers.justeattakeaway.com/global/en/home')
    await page.locator('[placeholder="Search for job title"]').fill('Test')
    await page.locator('[data-ps="1a1b2be7-span-34"]').getByRole('button', {name: 'Search'}).click()
    page.locator('[data-ps="0949aad0-h1-1"]:text-is("search jobs")')
    const filteredJobs = await page.locator('[data-ph-at-id="heading-text"]', {
        hasText: 'results for'
    }).innerText()

    const numberOfGlobalFilteredJobs: number = Number(filteredJobs.match(/\d+/)?.[0] ?? 0)

    
    console.log('filteredJobs: ', filteredJobs);
    console.log('numberOfGlobalFilteredJobs:', numberOfGlobalFilteredJobs);

    const numberOfAvailableJobsWorldWide = 1
})