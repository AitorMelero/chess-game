import { type SquareModelType } from './Square'

export interface PieceModelType {
  get svgImage(): string
  get square(): SquareModelType | null
  set square(square: SquareModelType | null): void
  paintInSquare: () => void
  unpaintInSquare: () => void
}
