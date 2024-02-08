import { getKingNextPossibleMoves } from '../helpers'
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
        ...getKingNextPossibleMoves(pieceSquare)
      ]
    }

    return nextPossibleSquares
  }
}
