import { PieceModel } from './PieceModel'

export class QueenModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteQueenImage = './src/assets/Pieces/wq.png'
    const blackQueenImage = './src/assets/Pieces/bq.png'
    const image = isWhite ? whiteQueenImage : blackQueenImage
    super(image, isWhite)
  }
}
