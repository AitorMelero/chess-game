import { blackKingImage, whiteKingImage } from '../assets/Pieces'
import { PieceModel } from './PieceModel'

export class KingModel extends PieceModel {
  constructor (isWhite: boolean) {
    const image = isWhite ? whiteKingImage : blackKingImage
    super(image, isWhite)
  }
}
