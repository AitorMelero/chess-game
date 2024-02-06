import { type PlayerModelType } from './Player'
import { type SquareModelType } from './Square'

export interface PieceModelType {
  get player(): PlayerModelType
  get image(): string
  get square(): SquareModelType | undefined
  set square(square: SquareModelType | undefined): void
  paintInSquare: () => void
  unpaintInSquare: () => void
}
