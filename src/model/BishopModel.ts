import { PieceModel } from './PieceModel'

export class BishopModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whiteBishopImage = './src/assets/Pieces/wb.png'
    const blackBishopImage = './src/assets/Pieces/bb.png'
    const image = isWhite ? whiteBishopImage : blackBishopImage
    super(image, isWhite)
  }
}
