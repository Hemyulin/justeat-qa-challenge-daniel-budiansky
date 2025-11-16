import { test } from '@playwright/test'

test('Test case 1', async ({page}) => {
    await page.goto('https://careers.justeattakeaway.com/global/en/home')
})