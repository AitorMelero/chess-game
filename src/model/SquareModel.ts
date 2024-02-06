import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class SquareModel implements SquareModelType {
  readonly #xPosition: number
  readonly #yPosition: number
  readonly #isSelected: boolean
  readonly #isPossibleMove: boolean
  #piece: PieceModelType | null

  constructor (xPosition: number, yPosition: number) {
    this.#xPosition = xPosition
    this.#yPosition = yPosition
    this.#isSelected = false
    this.#isPossibleMove = false
    this.#piece = null
  }

  get xPosition (): number {
    return this.#xPosition
  }

  get yPosition (): number {
    return this.#yPosition
  }

  get isSelected (): boolean {
    return this.#isSelected
  }

  get isPossibleMove (): boolean {
    return this.#isPossibleMove
  }

  get piece (): PieceModelType | null {
    return this.#piece
  }

  set piece (piece: PieceModelType | null) {
    this.#piece = piece
  }

  paintSelected (): void {

  }

  unpaintSelected (): void {

  }

  paintPossibleMove (): void {

  }

  unpaintPossibleMove (): void {

  }
}
