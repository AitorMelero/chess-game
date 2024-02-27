import { type SquarePosition, type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class KnightModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteKnightImage = '/assets/Pieces/wn.png'
    const blackKnightImage = '/assets/Pieces/bn.png'
    const image = isWhite ? whiteKnightImage : blackKnightImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    const possibleNextSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const possiblePosition: SquarePosition[] = [
        {
          xPosition: this.square.xPosition - 2,
          yPosition: this.square.yPosition + 1
        },
        {
          xPosition: this.square.xPosition - 1,
          yPosition: this.square.yPosition + 2
        },
        {
          xPosition: this.square.xPosition + 1,
          yPosition: this.square.yPosition + 2
        },
        {
          xPosition: this.square.xPosition + 2,
          yPosition: this.square.yPosition + 1
        },
        {
          xPosition: this.square.xPosition + 2,
          yPosition: this.square.yPosition - 1
        },
        {
          xPosition: this.square.xPosition + 1,
          yPosition: this.square.yPosition - 2
        },
        {
          xPosition: this.square.xPosition - 1,
          yPosition: this.square.yPosition - 2
        },
        {
          xPosition: this.square.xPosition - 2,
          yPosition: this.square.yPosition - 1
        }
      ]

      const chessboard = this.square.chessboard
      possiblePosition.forEach(position => {
        const square = chessboard.getSquareFromPosition(position)
        if (square !== undefined) {
          const pieceInSquare = square.piece
          if (pieceInSquare === undefined || pieceInSquare.isWhite !== this.isWhite) {
            possibleNextSquares.push(square)
          }
        }
      })
    }

    this.possibleNextSquares = possibleNextSquares

    return possibleNextSquares
  }
}
