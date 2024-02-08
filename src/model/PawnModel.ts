import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whitePawnImage = './src/assets/Pieces/wp.png'
    const blackPawnImage = './src/assets/Pieces/bp.png'
    const image = isWhite ? whitePawnImage : blackPawnImage
    super(image, isWhite)
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    const currentSquare = this.square
    let nextPossibleSquares: SquareModelType[] = []

    if (currentSquare !== undefined) {
      nextPossibleSquares = currentSquare.chessboard.squares.filter(
        square => square.yPosition === currentSquare.yPosition + 1 && square.xPosition === currentSquare.xPosition
      )
    }

    return nextPossibleSquares
  }
}
