import { getRookNextPossibleMoves, isCheck } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  #isFirstMove: boolean

  constructor (isWhite: boolean) {
    const whiteRookImage = './src/assets/Pieces/wr.png'
    const blackRookImage = './src/assets/Pieces/br.png'
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
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      nextPossibleSquares = getRookNextPossibleMoves(this.square)
    }

    return nextPossibleSquares.filter(nextPossibleSquare => !isCheck(this, nextPossibleSquare))
  }
}
