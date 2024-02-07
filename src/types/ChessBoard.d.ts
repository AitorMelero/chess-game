import { type PieceModelType } from './Piece'
import { type PlayerModelType } from './Player'
import { type SquareModelType } from './Square'

export interface ChessboardModelType {
  get players(): PlayerModelType[]
  get squares(): SquareModelType[]
  get possibleNextSquares(): SquareModelType[]
  get currentPiece(): PieceModelType | undefined
  get pieces(): PieceModelType[]
}

export interface ChessboardProps {
  chessboardModel: ChessboardModelType
}
