import { getBishopNextPossibleMoves } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class BishopModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteBishopImage = '/assets/Pieces/wb.png'
    const blackBishopImage = '/assets/Pieces/bb.png'
    const image = isWhite ? whiteBishopImage : blackBishopImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let possibleNextSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      possibleNextSquares = getBishopNextPossibleMoves(this.square)
    }

    this.possibleNextSquares = possibleNextSquares

    return possibleNextSquares
  }
}
