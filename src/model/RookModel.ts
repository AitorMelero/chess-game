import { type ChessboardModelType } from '../types/Chessboard'
import { type SquarePosition, type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteRookImage = './src/assets/Pieces/wr.png'
    const blackRookImage = './src/assets/Pieces/br.png'
    const image = isWhite ? whiteRookImage : blackRookImage
    super(image, isWhite)
  }

  private calculatePossibleNextUpSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false

    for (let y = piecePosition.yPosition + 1; y <= 8 && !isAllMove; y++) {
      const position: SquarePosition = { xPosition: piecePosition.xPosition, yPosition: y }
      const loopCurrentSquare = chessboard.getSquareFromPosition(position)
      if (loopCurrentSquare !== undefined) {
        if (loopCurrentSquare.piece !== undefined) {
          if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
            nextPossibleSquares.push(loopCurrentSquare)
          }
          isAllMove = true
        } else {
          nextPossibleSquares.push(loopCurrentSquare)
        }
      }
    }

    return nextPossibleSquares
  }

  private calculatePossibleNextRightSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false

    for (let x = piecePosition.xPosition + 1; x <= 8 && !isAllMove; x++) {
      const position: SquarePosition = { xPosition: x, yPosition: piecePosition.yPosition }
      const loopCurrentSquare = chessboard.getSquareFromPosition(position)
      if (loopCurrentSquare !== undefined) {
        if (loopCurrentSquare.piece !== undefined) {
          if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
            nextPossibleSquares.push(loopCurrentSquare)
          }
          isAllMove = true
        } else {
          nextPossibleSquares.push(loopCurrentSquare)
        }
      }
    }

    return nextPossibleSquares
  }

  private calculatePossibleNextDownSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false

    for (let y = piecePosition.yPosition - 1; y > 0 && !isAllMove; y--) {
      const position: SquarePosition = { xPosition: piecePosition.xPosition, yPosition: y }
      const loopCurrentSquare = chessboard.getSquareFromPosition(position)
      if (loopCurrentSquare !== undefined) {
        if (loopCurrentSquare.piece !== undefined) {
          if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
            nextPossibleSquares.push(loopCurrentSquare)
          }
          isAllMove = true
        } else {
          nextPossibleSquares.push(loopCurrentSquare)
        }
      }
    }

    return nextPossibleSquares
  }

  private calculatePossibleNextLeftSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false

    for (let x = piecePosition.xPosition - 1; x > 0 && !isAllMove; x--) {
      const position: SquarePosition = { xPosition: x, yPosition: piecePosition.yPosition }
      const loopCurrentSquare = chessboard.getSquareFromPosition(position)
      if (loopCurrentSquare !== undefined) {
        if (loopCurrentSquare.piece !== undefined) {
          if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
            nextPossibleSquares.push(loopCurrentSquare)
          }
          isAllMove = true
        } else {
          nextPossibleSquares.push(loopCurrentSquare)
        }
      }
    }

    return nextPossibleSquares
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const piecePosition: SquarePosition = { xPosition: this.square.xPosition, yPosition: this.square.yPosition }
      const chessboard = this.square.chessboard

      // Up move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextUpSquares(piecePosition, chessboard)
      ]

      // Right move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextRightSquares(piecePosition, chessboard)
      ]

      // Down move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextDownSquares(piecePosition, chessboard)
      ]

      // Left move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextLeftSquares(piecePosition, chessboard)
      ]
    }

    return nextPossibleSquares
  }
}
