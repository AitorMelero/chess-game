import { blackBishopImage, whiteBishopImage } from '../assets/Pieces'
import { PieceModel } from './PieceModel'

export class BishopModel extends PieceModel {
  constructor (isWhite: boolean) {
    const image = isWhite ? whiteBishopImage : blackBishopImage
    super(image, isWhite)
  }
}
