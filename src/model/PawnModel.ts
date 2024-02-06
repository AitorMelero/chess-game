import { whitePawnImage } from '../assets/Pieces'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (square: SquareModelType) {
    super(whitePawnImage, square)
  }
}
