import { getBishopNextPossibleMoves, getRookNextPossibleMoves } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class KingModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteKingImage = './src/assets/Pieces/wk.png'
    const blackKingImage = './src/assets/Pieces/bk.png'
    const image = isWhite ? whiteKingImage : blackKingImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const pieceSquare = this.square

      nextPossibleSquares = [
        ...getRookNextPossibleMoves(this.square),
        ...getBishopNextPossibleMoves(this.square)
      ].filter(square => {
        return (
          (square.xPosition === pieceSquare.xPosition && square.yPosition === pieceSquare.yPosition + 1) ||
          (square.xPosition === pieceSquare.xPosition + 1 && square.yPosition === pieceSquare.yPosition + 1) ||
          (square.xPosition === pieceSquare.xPosition + 1 && square.yPosition === pieceSquare.yPosition) ||
          (square.xPosition === pieceSquare.xPosition + 1 && square.yPosition === pieceSquare.yPosition - 1) ||
          (square.xPosition === pieceSquare.xPosition && square.yPosition === pieceSquare.yPosition - 1) ||
          (square.xPosition === pieceSquare.xPosition - 1 && square.yPosition === pieceSquare.yPosition - 1) ||
          (square.xPosition === pieceSquare.xPosition - 1 && square.yPosition === pieceSquare.yPosition) ||
          (square.xPosition === pieceSquare.xPosition - 1 && square.yPosition === pieceSquare.yPosition + 1)
        )
      })
    }

    return nextPossibleSquares
  }
}
