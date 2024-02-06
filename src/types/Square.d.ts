import { type PieceModelType } from './Piece'

export interface SquareModelType {
  get xPosition(): number
  get yPosition(): number
  get squareIdElement(): string
  get isSelected(): boolean
  get squareSelectedIdElement(): string
  get isPossibleMove(): boolean
  get squarePossibleMoveIdElement(): string
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

export interface UseSquare {
  bgColor: string
  coordinateColor: string
  numberPosition: string
  letterPosition: string
}

// export interface PositionCoordinate {
//   xPosition: number
//   yPosition: number
// }
