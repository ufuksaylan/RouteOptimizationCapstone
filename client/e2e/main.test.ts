import { loginNewUser } from 'utils/api'
import { test } from '@playwright/test'

test('user can add a trip', async ({ page }) => {
  // Given (ARRANGE)
  await loginNewUser(page)
  await page.goto('/dashboard')

  await page.getByTestId('createProject').click()
  await page.getByRole('textbox', { name: 'Trip name' }).click()
  await page.getByRole('textbox', { name: 'Trip name' }).fill('hey')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.locator('.inline-block').click()
  await page.getByRole('columnheader', { name: 'Number of Stops' }).click()
  await page.getByRole('cell', { name: '0', exact: true }).click()
})

test('user can add a location to the trip', async ({ page }) => {
  // Given (ARRANGE)
  await loginNewUser(page)
  await page.goto('/dashboard')

  await page.getByTestId('createProject').click()
  await page.getByRole('textbox', { name: 'Trip name' }).click()
  await page.getByRole('textbox', { name: 'Trip name' }).fill('hey')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByRole('link', { name: 'View' }).click()
  await page.getByRole('button', { name: 'Add Stops (Advanced)' }).click()
  await page.getByPlaceholder('Central Park', { exact: true }).click()
  await page.getByPlaceholder('Central Park', { exact: true }).fill('central park')
  await page.getByPlaceholder('Central Park', { exact: true }).press('Tab')
  await page.getByPlaceholder('5 Av to Central Park W, 59 St to 110 St').fill('5 av.')
  await page.getByPlaceholder('5 Av to Central Park W, 59 St to 110 St').press('Tab')
  await page.getByPlaceholder('38.8951').fill('38.8951')
  await page.getByPlaceholder('77.0364').click()
  await page.getByPlaceholder('77.0364').fill('77.0364')
  await page.getByPlaceholder('park', { exact: true }).click()
  await page.getByPlaceholder('park', { exact: true }).fill('park')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByText('central park5 av.').click()
  await page.getByText('central park').first().click()
  await page.getByText('5 av.').click()
})
