import { blackQueenImage, whiteQueenImage } from '../assets/Pieces'
import { PieceModel } from './PieceModel'

export class QueenModel extends PieceModel {
  constructor (isWhite: boolean) {
    const image = isWhite ? whiteQueenImage : blackQueenImage
    super(image, isWhite)
  }
}
