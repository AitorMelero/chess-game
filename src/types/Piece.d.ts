import { type SquareModelType } from './Square'

export interface PieceModelType {
  get svgImage(): string
  get square(): SquareModelType | undefined
  set square(square: SquareModelType | undefined): void
  paintInSquare: () => void
  unpaintInSquare: () => void
}
