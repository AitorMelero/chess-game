import { test, expect } from '@playwright/experimental-ct-react'
import { Square } from '../../src/components/Square'

test.describe('Square test', () => {
  test('comprobar si las casillas negras se pintan correctamente', async ({ mount }) => {
    const blackSquare = await mount(
      <Square xPosition={1} yPosition={1} />
    )
    const bgDarkClass = /bg-dark-square/

    await expect(blackSquare).toHaveClass(bgDarkClass)
  })

  test('comprobar si las casillas blancas se pintan correctamente', async ({ mount }) => {
    const whiteSquare = await mount(
      <Square xPosition={1} yPosition={2} />
    )
    const bgLightClass = /bg-light-square/

    await expect(whiteSquare).toHaveClass(bgLightClass)
  })
})
