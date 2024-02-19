import { type PieceModelType } from './Piece'
import { type SquareModelType } from './Square'

export interface GameHistoryModelType {
  get chessboardHistory(): ChessboardHistoryType[]
  get playsHistory(): string[]
  addPlay: (oldSquare: SquareModelType, newSquare: SquareModelType, piece: PieceModelType) => void
  goPlay: (indexPlay: number) => void
  goPreviousPlay: () => void
  goNextPlay: () => void
}

export interface ChessboardHistoryType {
  chessboard: PlayType[]
}

export interface PlayType {
  square: SquareModelType
  piece: PieceModelType
}
