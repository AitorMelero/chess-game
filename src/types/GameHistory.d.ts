import { type PieceModelType } from './Piece'
import { type SquareModelType } from './Square'

export interface GameHistoryModelType {
  get chessboardHistory(): PlayType[]
  get playsHistory(): string[]
  addPlay: (
    oldSquare: SquareModelType,
    newSquare: SquareModelType,
    piece: PieceModelType,
    isEatPiece: boolean,
    isCheck: boolean,
    isCheckmate: boolean,
    isCastling: boolean,
    isHorizontalAmbiguity: boolean,
    isVerticalAmbiguity: boolean
  ) => void
  goPlay: (indexPlay: number) => void
  goPreviousPlay: () => void
  goNextPlay: () => void
  restart: () => void
}

export interface PlayType {
  oldSquare: SquareModelType
  newSquare: SquareModelType
  piece: PieceModelType
}
