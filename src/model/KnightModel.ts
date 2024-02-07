import { PieceModel } from './PieceModel'

export class KnightModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteKnightImage = './src/assets/Pieces/wn.png'
    const blackKnightImage = './src/assets/Pieces/bn.png'
    const image = isWhite ? whiteKnightImage : blackKnightImage
    super(image, isWhite)
  }
}
