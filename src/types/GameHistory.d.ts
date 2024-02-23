import { type ChessboardModelType } from './Chessboard'
import { type PieceModelType } from './Piece'
import { type SquareModelType } from './Square'

export interface GameHistoryModelType {
  get chessboardHistory(): PlayType[]
  get playsHistory(): string[]
  get currentPlayIndex(): number
  addPlay: (
    oldSquare: SquareModelType,
    newSquare: SquareModelType,
    piece: PieceModelType,
    eatenPiece: PieceModelType | undefined,
    isEatEnPassant: boolean,
    isCheck: boolean,
    isCheckmate: boolean,
    isCastling: boolean,
    isHorizontalAmbiguity: boolean,
    isVerticalAmbiguity: boolean
  ) => void
  goPlay: (indexPlay: number) => void
  goPreviousPlay: (chessboard: ChessboardModelType) => void
  goNextPlay: (chessboard: ChessboardModelType) => void
  restart: () => void
}

export interface PlayType {
  oldSquare: SquareModelType
  newSquare: SquareModelType
  piece: PieceModelType
  eatenPiece: PieceModelType | undefined
  isEatEnPassant: boolean
}
