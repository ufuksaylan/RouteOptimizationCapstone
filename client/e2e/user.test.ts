import { test, expect } from '@playwright/test'
import { loginNewUser } from 'utils/api'
import { fakeUser } from 'utils/fakeData'

const { email, password } = fakeUser()

test.describe('signup and login sequence', () => {
  test('visitor can signup', async ({ page }) => {
    // Given (ARRANGE)
    await page.goto('/signup')
    const successMessage = page.locator('[data-testid="successMessage"]')
    await expect(successMessage).toBeHidden() // sanity check

    // When (ACT)
    await page.locator('input[type="email"]').click()
    await page.locator('input[type="email"]').fill(email)
    await page.locator('input[type="email"]').press('Tab')
    await page.locator('input[name="password"]').fill(password)
    await page.getByRole('button', { name: 'Sign up' }).click()

    // assert
    await expect(successMessage).toBeVisible() // Wait up to 10 seconds
  })

  test('test', async ({ page }) => {
    await page.goto('/dashboard')

    await page.waitForURL('/login')
  })

  test('visitor can login', async ({ page }) => {
    // Given (ARRANGE)
    await page.goto('/login')
    const dashboardLink = await page.getByLabel('Dashboard')
    await expect(dashboardLink).toBeHidden()

    // When (ACT)
    await page.locator('input[type="email"]').click()
    await page.locator('input[type="email"]').fill(email)
    await page.locator('input[type="password"]').fill(password)
    await page.locator('input[name="password"]').press('Enter')
    await page.getByTestId('loginForm').click()

    // Then (ASSERT)
    await expect(dashboardLink).toBeVisible()

    // Refresh the page to make sure that the user is still logged in.
    await page.reload()
    await expect(dashboardLink).toBeVisible()
  })

  // test('visitor can logout', async ({ page }) => {
  //   // Given (ARRANGE)
  //   await loginNewUser(page)

  //   await page.goto('/dashboard')

  //   const logoutLink = await page.getByTestId('logoutLink').getByRole('img', { name: 'logo' })

  //   // When (ACT)
  //   await logoutLink.click()

  //   // Then (ASSERT)
  //   await expect(logoutLink).toBeHidden()

  //   // Ensure that we are redirected to the login page.
  //   // This test would break if we changed the login page URL,
  //   // but this is a signifcant change that we would want to
  //   // be aware of.
  //   await expect(page).toHaveURL('/login')

  //   // Refresh the page to make sure that the user is still logged out.
  //   await page.goto('/dashboard')
  //   await expect(logoutLink).toBeHidden()
  //   await expect(page).toHaveURL('/login')
  // })
})
