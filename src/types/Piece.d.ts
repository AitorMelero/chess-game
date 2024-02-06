import { type SquarePosition, type SquareModelType } from './Square'

export interface PieceModelType {
  get svgImage(): string
  get initPosition(): SquarePosition
  get square(): SquareModelType | undefined
  set square(square: SquareModelType | undefined): void
  paintInSquare: () => void
  unpaintInSquare: () => void
}
