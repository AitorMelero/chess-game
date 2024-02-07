import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whitePawnImage = './src/assets/Pieces/wp.png'
    const blackPawnImage = './src/assets/Pieces/bp.png'
    const image = isWhite ? whitePawnImage : blackPawnImage
    super(image, isWhite)
  }
}
