import { PieceModel } from './PieceModel'

export class RookModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteRookImage = './src/assets/Pieces/wr.png'
    const blackRookImage = './src/assets/Pieces/br.png'
    const image = isWhite ? whiteRookImage : blackRookImage
    super(image, isWhite)
  }
}
