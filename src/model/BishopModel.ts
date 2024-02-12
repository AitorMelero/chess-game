import { getBishopNextPossibleMoves, isCheck } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class BishopModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteBishopImage = './src/assets/Pieces/wb.png'
    const blackBishopImage = './src/assets/Pieces/bb.png'
    const image = isWhite ? whiteBishopImage : blackBishopImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      nextPossibleSquares = getBishopNextPossibleMoves(this.square)
    }

    return nextPossibleSquares.filter(nextPossibleSquare => !isCheck(this, nextPossibleSquare))
  }
}
