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

  test('comprobar si se muestra la coordenada númerica de la casilla', async ({ mount }) => {
    const numberCoordinate = 2
    const square = await mount(
      <Square xPosition={1} yPosition={numberCoordinate} />
    )

    await expect(square).toContainText(numberCoordinate.toString())
  })

  test('comprobar si no se muestra la coordenada númerica de la casilla', async ({ mount }) => {
    const numberCoordinate = 2
    const square = await mount(
      <Square xPosition={2} yPosition={numberCoordinate} />
    )

    await expect(square).not.toContainText(numberCoordinate.toString())
  })

  test('comprobar si se muestra la coordenada letra de la casilla', async ({ mount }) => {
    const letterCoordinate = 2
    const square = await mount(
      <Square xPosition={letterCoordinate} yPosition={1} />
    )

    await expect(square).toContainText(String.fromCharCode(letterCoordinate + 96))
  })

  test('comprobar si no se muestra la coordenada letra de la casilla', async ({ mount }) => {
    const letterCoordinate = 2
    const square = await mount(
      <Square xPosition={letterCoordinate} yPosition={2} />
    )

    await expect(square).not.toContainText(String.fromCharCode(letterCoordinate + 96))
  })
})
