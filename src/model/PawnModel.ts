import { whitePawnImage } from '../assets/Pieces'
import { type SquarePosition } from '../types/Square'
import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (initPosition: SquarePosition) {
    super(whitePawnImage, initPosition)
  }
}
