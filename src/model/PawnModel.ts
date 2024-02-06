import { blackPawnImage, whitePawnImage } from '../assets/Pieces'
import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (isWhite: boolean) {
    const image = isWhite ? whitePawnImage : blackPawnImage
    super(image, isWhite)
  }
}
