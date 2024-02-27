import { getRookNextPossibleMoves } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  #isFirstMove: boolean

  constructor (isWhite: boolean) {
    const whiteRookImage = '/assets/Pieces/wr.png'
    const blackRookImage = '/assets/Pieces/br.png'
    const image = isWhite ? whiteRookImage : blackRookImage
    super(image, isWhite)
    this.#isFirstMove = true
  }

  get isFirstMove (): boolean {
    return this.#isFirstMove
  }

  set isFirstMove (isFirstMove: boolean) {
    this.#isFirstMove = isFirstMove
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let possibleNextSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      possibleNextSquares = getRookNextPossibleMoves(this.square)
    }

    this.possibleNextSquares = possibleNextSquares

    return possibleNextSquares
  }
}
