import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/signup')
  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill('at@at.com')
  await page.locator('input[type="email"]').press('Tab')
  await page.locator('input[name="password"]').fill('123456789')
  await page.getByRole('button', { name: 'Sign up' }).click()
  await page.getByRole('link', { name: 'Log in' }).click()
  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill('at@at.com')
  await page.locator('input[type="email"]').press('Tab')
  await page.locator('input[name="password"]').fill('123456789')
  await page.getByRole('button', { name: 'Log in' }).click()
})
