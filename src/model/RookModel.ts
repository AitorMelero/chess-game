import { blackRookImage, whiteRookImage } from '../assets/Pieces'
import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  constructor (isWhite: boolean) {
    const image = isWhite ? whiteRookImage : blackRookImage
    super(image, isWhite)
  }
}
