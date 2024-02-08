import { type SquarePosition, type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteRookImage = './src/assets/Pieces/wr.png'
    const blackRookImage = './src/assets/Pieces/br.png'
    const image = isWhite ? whiteRookImage : blackRookImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    const nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const pieceXPosition = this.square.xPosition
      const pieceYPosition = this.square.yPosition
      const chessboard = this.square.chessboard
      let isAllUpMove = false
      let isAllRightMove = false
      let isAllDownMove = false
      let isAllLeftMove = false

      // Up move
      for (let y = pieceYPosition + 1; y <= 8 && !isAllUpMove; y++) {
        const position: SquarePosition = { xPosition: pieceXPosition, yPosition: y }
        const loopCurrentSquare = chessboard.getSquareFromPosition(position)
        console.log(loopCurrentSquare)
        if (loopCurrentSquare !== undefined) {
          if (loopCurrentSquare.piece !== undefined) {
            if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
              nextPossibleSquares.push(loopCurrentSquare)
            }
            isAllUpMove = true
          } else {
            nextPossibleSquares.push(loopCurrentSquare)
          }
        }
      }

      // Right move
      for (let x = pieceXPosition + 1; x <= 8 && !isAllRightMove; x++) {
        const position: SquarePosition = { xPosition: x, yPosition: pieceYPosition }
        const loopCurrentSquare = chessboard.getSquareFromPosition(position)
        if (loopCurrentSquare !== undefined) {
          if (loopCurrentSquare.piece !== undefined) {
            if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
              nextPossibleSquares.push(loopCurrentSquare)
            }
            isAllRightMove = true
          } else {
            nextPossibleSquares.push(loopCurrentSquare)
          }
        }
      }

      // Down move
      for (let y = pieceYPosition - 1; y > 0 && !isAllDownMove; y--) {
        const position: SquarePosition = { xPosition: pieceXPosition, yPosition: y }
        const loopCurrentSquare = chessboard.getSquareFromPosition(position)
        if (loopCurrentSquare !== undefined) {
          if (loopCurrentSquare.piece !== undefined) {
            if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
              nextPossibleSquares.push(loopCurrentSquare)
            }
            isAllDownMove = true
          } else {
            nextPossibleSquares.push(loopCurrentSquare)
          }
        }
      }

      // Left move
      for (let x = pieceXPosition - 1; x > 0 && !isAllLeftMove; x--) {
        const position: SquarePosition = { xPosition: x, yPosition: pieceYPosition }
        const loopCurrentSquare = chessboard.getSquareFromPosition(position)
        if (loopCurrentSquare !== undefined) {
          if (loopCurrentSquare.piece !== undefined) {
            if (loopCurrentSquare.piece.isWhite !== this.isWhite) {
              nextPossibleSquares.push(loopCurrentSquare)
            }
            isAllLeftMove = true
          } else {
            nextPossibleSquares.push(loopCurrentSquare)
          }
        }
      }
    }

    return nextPossibleSquares
  }
}
