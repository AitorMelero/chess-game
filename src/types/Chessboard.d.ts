import { type PieceModelType } from './Piece'
import { type PlayerModelType } from './Player'
import { type SquarePosition, type SquareModelType } from './Square'

export interface ChessboardModelType {
  get players(): PlayerModelType[]
  get currentPlayer(): PlayerModelType
  get squares(): SquareModelType[]
  get pieces(): PieceModelType[]
  get currentPiece(): PieceModelType | undefined
  get whiteKing(): PieceModelType | undefined
  get blackKing(): PieceModelType | undefined
  getSquareFromPosition: (squarePosition: SquarePosition) => SquareModelType | undefined
  createPieces: () => void
  clickSquare: (squareClicked: SquareModelType) => void
}

export interface ChessboardProps {
  chessboardModel: ChessboardModelType
}
