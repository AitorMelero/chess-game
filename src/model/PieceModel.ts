import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export abstract class PieceModel implements PieceModelType {
  readonly #isWhite: boolean
  readonly #image: string
  #square: SquareModelType | undefined
  #possibleNextSquares: SquareModelType[]

  constructor (image: string, isWhite: boolean) {
    this.#isWhite = isWhite
    this.#image = image
    this.#square = undefined
    this.#possibleNextSquares = this.calculatePossibleNextSquares()
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

  get possibleNextSquares (): SquareModelType[] {
    return this.#possibleNextSquares
  }

  set possibleNextSquares (possibleNextSquares: SquareModelType[]) {
    this.#possibleNextSquares = possibleNextSquares
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    return []
  }

  paintInSquare (square: SquareModelType): void {
    try {
      if (square !== undefined && square.isPainted) {
        square.paintPiece(this)
        square.enableButton()
        this.square = square
      }
    } catch (error) {
      console.error('Error: Piece Paint In Square\n', error)
    }
  }

  unpaintInSquare (isSimulate?: boolean): void {
    try {
      if (this.square !== undefined && this.square.isPainted) {
        this.square.unpaintPiece(isSimulate)
        this.square.disableButton()
        this.square = undefined
      }
    } catch (error) {
      console.error('Error: Piece Unpaint In Square\n', error)
    }
  }
}
