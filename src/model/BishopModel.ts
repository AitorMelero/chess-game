import { type ChessboardModelType } from '../types/Chessboard'
import { type SquareModelType, type SquarePosition } from '../types/Square'
import { PieceModel } from './PieceModel'

export class BishopModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteBishopImage = './src/assets/Pieces/wb.png'
    const blackBishopImage = './src/assets/Pieces/bb.png'
    const image = isWhite ? whiteBishopImage : blackBishopImage
    super(image, isWhite)
  }

  private calculatePossibleNextUpRightSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false
    let xLoopPosition = piecePosition.xPosition + 1
    let yLoopPosition = piecePosition.yPosition + 1

    for (
      ;
      xLoopPosition <= 8 && yLoopPosition <= 8 && !isAllMove;
      xLoopPosition++, yLoopPosition++
    ) {
      const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
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
      } else {
        isAllMove = true
      }
    }

    return nextPossibleSquares
  }

  private calculatePossibleNextDownRightSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false
    let xLoopPosition = piecePosition.xPosition + 1
    let yLoopPosition = piecePosition.yPosition - 1

    for (
      ;
      xLoopPosition <= 8 && yLoopPosition > 0 && !isAllMove;
      xLoopPosition++, yLoopPosition--
    ) {
      const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
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
      } else {
        isAllMove = true
      }
    }

    return nextPossibleSquares
  }

  private calculatePossibleNextDownLeftSquares (
    piecePosition: SquarePosition,
    chessboard: ChessboardModelType
  ): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []
    let isAllMove = false
    let xLoopPosition = piecePosition.xPosition - 1
    let yLoopPosition = piecePosition.yPosition - 1

    for (
      ;
      xLoopPosition > 0 && yLoopPosition > 0 && !isAllMove;
      xLoopPosition--, yLoopPosition--
    ) {
      const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
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
      } else {
        isAllMove = true
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
    let xLoopPosition = piecePosition.xPosition - 1
    let yLoopPosition = piecePosition.yPosition + 1

    for (
      ;
      xLoopPosition > 0 && yLoopPosition <= 8 && !isAllMove;
      xLoopPosition--, yLoopPosition++
    ) {
      const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
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
      } else {
        isAllMove = true
      }
    }

    return nextPossibleSquares
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const piecePosition: SquarePosition = {
        xPosition: this.square.xPosition,
        yPosition: this.square.yPosition
      }
      const chessboard = this.square.chessboard

      // Up move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextUpRightSquares(piecePosition, chessboard)
      ]

      // Right move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextDownRightSquares(piecePosition, chessboard)
      ]

      // Down move
      nextPossibleSquares = [
        ...nextPossibleSquares,
        ...this.calculatePossibleNextDownLeftSquares(piecePosition, chessboard)
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
