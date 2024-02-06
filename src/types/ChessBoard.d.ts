import { type PieceModelType } from './Piece'
import { type SquareModelType } from './Square'

export interface ChessboardModelType {
  get squares(): SquareModelType[]
  get possibleNextSquares(): SquareModelType[]
  get currentPiece(): PieceModelType | null
  get pieces(): PieceModelType[]
}

export interface ChessboardProps {
  chessboardModel: ChessboardModelType
}
