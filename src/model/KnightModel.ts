import { blackKnightImage, whiteKnightImage } from '../assets/Pieces'
import { PieceModel } from './PieceModel'

export class KnightModel extends PieceModel {
  constructor (isWhite: boolean) {
    const image = isWhite ? whiteKnightImage : blackKnightImage
    super(image, isWhite)
  }
}
