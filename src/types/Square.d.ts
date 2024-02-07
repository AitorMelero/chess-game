import { type PieceModelType } from './Piece'

export interface SquareModelType {
  get xPosition(): number
  get yPosition(): number
  get squareIdElement(): string
  get isSelected(): boolean
  get squareSelectedIdElement(): string
  get isPossibleMove(): boolean
  get squarePossibleMoveIdElement(): string
  get piece(): PieceModelType | undefined
  set piece(piece: PieceModelType | undefined): void
  get squarePieceIdElement(): string
  get isPainted(): boolean
  paintSelected: () => void
  unpaintSelected: () => void
  paintPossibleMove: () => void
  unpaintPossibleMove: () => void
  enableButton: () => void
  disableButton: () => void
  paintPiece: (imagePiece: string) => void
  unpaintPiece: () => void
}

export interface SquareProps {
  squareModel: SquareModelType
  handleClick: () => void
}

export interface UseSquare {
  bgColor: string
  coordinateColor: string
  numberPosition: string
  letterPosition: string
}

export interface SquarePosition {
  xPosition: number
  yPosition: number
}
