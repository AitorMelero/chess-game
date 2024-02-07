import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export abstract class PieceModel implements PieceModelType {
  readonly #isWhite: boolean
  readonly #image: string
  #square: SquareModelType | undefined

  constructor (image: string, isWhite: boolean) {
    this.#isWhite = isWhite
    this.#image = image
    this.#square = undefined
  }

  get isWhite (): boolean {
    return this.#isWhite
  }

  get image (): string {
    return this.#image
  }

  get square (): SquareModelType | undefined {
    return this.#square
  }

  set square (square: SquareModelType | undefined) {
    this.#square = square
  }

  paintInSquare (): void {
    try {
      if (this.square !== undefined && this.square.isPainted) {
        this.square.paintPiece(this.image)
        this.square.enableButton()
      }
    } catch (error) {
      console.error('Error: Piece Paint In Square\n', error)
    }
  }

  unpaintInSquare (): void {
    try {
      if (this.square !== undefined && this.square.isPainted) {
        this.square.unpaintPiece()
        this.square.disableButton()
      }
    } catch (error) {
      console.error('Error: Piece Unpaint In Square\n', error)
    }
  }
}
