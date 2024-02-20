import { type PawnModel } from '../model'
import { type GameHistoryModelType } from './GameHistory'
import { type NewChoosePiece, type PieceModelType } from './Piece'
import { type PlayerModelType } from './Player'
import { type SquarePosition, type SquareModelType } from './Square'

export interface PossibleEnPassant {
  pawn: PawnModel
  square: SquareModelType | undefined
}

export interface ChessboardModelType {
  get players(): PlayerModelType[]
  get currentPlayer(): PlayerModelType
  set currentPlayer(currentPlayer: PlayerModelType): void
  get squares(): SquareModelType[]
  get pieces(): PieceModelType[]
  get currentPiece(): PieceModelType | undefined
  get whiteKing(): PieceModelType | undefined
  get blackKing(): PieceModelType | undefined
  get currentChangePawn(): PieceModelType | undefined
  get possibleEnPassant(): PossibleEnPassant | undefined
  set possibleEnPassant(possibleEnPassant: PossibleEnPassant | undefined): void
  get gameHistory(): GameHistoryModelType
  getSquareFromPosition: (squarePosition: SquarePosition) => SquareModelType | undefined
  createPieces: () => void
  clickSquare: (squareClicked: SquareModelType) => void
  showChangePawnModal: (pawn: PieceModelType) => void
  changePawn: (newTypePiece: NewChoosePiece) => void
  restartGame: () => void
}

export interface ChessboardProps {
  chessboardModel: ChessboardModelType
}
