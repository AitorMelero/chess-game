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
    let possibleNextSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      possibleNextSquares = [
        ...getRookNextPossibleMoves(this.square),
        ...getBishopNextPossibleMoves(this.square)
      ]
    }

    this.possibleNextSquares = possibleNextSquares

    return possibleNextSquares
  }
}
