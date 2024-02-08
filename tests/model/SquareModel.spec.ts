import test, { expect } from '@playwright/test'
import { SquareModel } from '../../src/model/SquareModel'
import { PawnModel } from '../../src/model/PawnModel'
import { ChessboardModel } from '../../src/model'

test.describe('SquareModel Testing', () => {
  const xPosition = 1
  const yPosition = 1
  const squareIdElement = `square-${xPosition}-${yPosition}`
  const squareSelectedIdElement = `square-selected-${xPosition}-${yPosition}`
  const squarePossibleMoveIdElement = `square-possible-move-${xPosition}-${yPosition}`
  const chessboard = new ChessboardModel()
  const square = new SquareModel(chessboard, xPosition, yPosition)
  const isWhitePiece = true
  const piece = new PawnModel(isWhitePiece)

  test('debería devolver la posicion x de manera correcta', () => {
    expect(square.xPosition).toBe(xPosition)
  })

  test('debería devolver la posicion y de manera correcta', () => {
    expect(square.yPosition).toBe(yPosition)
  })

  test('debería devolver el id del elemento de manera correcta', () => {
    expect(square.squareIdElement).toBe(squareIdElement)
  })

  test('debería devolver si está seleccionada de manera correcta', () => {
    expect(square.isSelected).toBeFalsy()
  })

  test('debería devolver el id del elemento de seleccionada de manera correcta', () => {
    expect(square.squareSelectedIdElement).toBe(squareSelectedIdElement)
  })

  test('debería devolver si es un posible movimiento de manera correcta', () => {
    expect(square.isPossibleMove).toBeFalsy()
  })

  test('debería devolver el id del elemento de posible movimiento de manera correcta', () => {
    expect(square.squarePossibleMoveIdElement).toBe(squarePossibleMoveIdElement)
  })

  test('debería devolver su pieza de manera correcta', () => {
    expect(square.piece).toBeUndefined()
  })

  test('debería modificar su pieza de manera correcta', () => {
    square.piece = piece

    expect(square.piece).toStrictEqual(piece)
  })
})
