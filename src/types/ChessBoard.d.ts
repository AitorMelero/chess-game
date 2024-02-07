import { type PieceModelType } from './Piece'
import { type PlayerModelType } from './Player'
import { type SquareModelType } from './Square'

export interface ChessboardModelType {
  get players(): PlayerModelType[]
  get squares(): SquareModelType[]
  get currentPiece(): PieceModelType | undefined
  get pieces(): PieceModelType[]
  clickSquare: (squareClicked: SquareModelType) => void
}

export interface ChessboardProps {
  chessboardModel: ChessboardModelType
}
