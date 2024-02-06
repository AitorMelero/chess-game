import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export abstract class PieceModel implements PieceModelType {
  readonly #svgImage: string
  #square: SquareModelType | null

  constructor (svgImage: string) {
    this.#svgImage = svgImage
    this.#square = null
  }

  get svgImage (): string {
    return this.#svgImage
  }

  get square (): SquareModelType | null {
    return this.#square
  }

  set square (square: SquareModelType | null) {
    this.#square = square
  }

  paintInSquare (): void {}

  unpaintInSquare (): void {}
}
