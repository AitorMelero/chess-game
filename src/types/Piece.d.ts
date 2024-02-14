import { type SquareModelType } from './Square'

export interface PieceModelType {
  get isWhite(): boolean
  get image(): string
  get square(): SquareModelType | undefined
  set square(square: SquareModelType | undefined): void
  get possibleNextSquares (): SquareModelType[]
  set possibleNextSquares (possibleNextSquares: SquareModelType[])
  calculatePossibleNextSquares: () => SquareModelType[]
  paintInSquare: (square: SquareModelType) => void
  unpaintInSquare: () => void
}

type NewChoosePiece = 'Queen' | 'Bishop' | 'Knight' | 'Rook'
