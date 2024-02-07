import { PieceModel } from './PieceModel'

export class KingModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteKingImage = './src/assets/Pieces/wk.png'
    const blackKingImage = './src/assets/Pieces/bk.png'
    const image = isWhite ? whiteKingImage : blackKingImage
    super(image, isWhite)
  }
}
