import { type PieceModelType } from './Piece'

export interface SquareModelType {
  get xPosition(): number
  get yPosition(): number
  get isSelected(): boolean
  get isPossibleMove(): boolean
  get piece(): PieceModelType | null
  set piece(piece: PieceModelType | null): void
  paintSelected: () => void
  unpaintSelected: () => void
  paintPossibleMove: () => void
  unpaintPossibleMove: () => void
}

export interface SquareProps {
  squareModel: SquareModelType
}

// export interface PositionCoordinate {
//   xPosition: number
//   yPosition: number
// }
