import { getRookNextPossibleMoves } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteRookImage = './src/assets/Pieces/wr.png'
    const blackRookImage = './src/assets/Pieces/br.png'
    const image = isWhite ? whiteRookImage : blackRookImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      nextPossibleSquares = getRookNextPossibleMoves(this.square)
    }

    return nextPossibleSquares
  }
}
