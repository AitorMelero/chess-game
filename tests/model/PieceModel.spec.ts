import { expect, test } from '@playwright/test'
import { PawnModel } from '../../src/model/PawnModel'
import { SquareModel } from '../../src/model/SquareModel'
import { ChessboardModel } from '../../src/model'

test.describe('PieceModel Testing', () => {
  // Pawn piece as example
  const isWhite = true
  const whiteImage = './src/assets/Pieces/wp.png'
  const blackImage = './src/assets/Pieces/bp.png'
  const whitePiece = new PawnModel(isWhite)
  const blackPiece = new PawnModel(!isWhite)
  const xPosition = 1
  const yPosition = 1
  const chessboard = new ChessboardModel()
  const squareModel = new SquareModel(chessboard, xPosition, yPosition)

  test('debería devolver el valor isWhite correcto', () => {
    expect(whitePiece.isWhite).toBeTruthy()
    expect(blackPiece.isWhite).toBeFalsy()
  })

  test('debería devolver el path de la imagen correcta', () => {
    expect(whitePiece.image).toStrictEqual(whiteImage)
    expect(blackPiece.image).toStrictEqual(blackImage)
  })

  test('debería devolver el square correcto', () => {
    expect(whitePiece.square).toBeUndefined()
    expect(blackPiece.square).toBeUndefined()

    whitePiece.square = squareModel
    blackPiece.square = squareModel
  })

  test('debería modificar el square de manera correcta', () => {
    whitePiece.square = squareModel
    blackPiece.square = squareModel

    expect(whitePiece.square).toStrictEqual(squareModel)
    expect(blackPiece.square).toStrictEqual(squareModel)
  })
})
