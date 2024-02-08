import { getBishopNextPossibleMoves, getRookNextPossibleMoves } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class QueenModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteQueenImage = './src/assets/Pieces/wq.png'
    const blackQueenImage = './src/assets/Pieces/bq.png'
    const image = isWhite ? whiteQueenImage : blackQueenImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      nextPossibleSquares = [
        ...getRookNextPossibleMoves(this.square),
        ...getBishopNextPossibleMoves(this.square)
      ]
    }

    return nextPossibleSquares
  }
}
