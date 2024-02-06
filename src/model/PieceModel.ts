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
      if (this.#square !== undefined) {
        const squareElementId = `square-piece-${this.#square.xPosition}-${this.#square.yPosition}`
        const squareElement = document.getElementById(squareElementId)
        if (squareElement !== null) {
          squareElement.innerHTML = `<img src=${this.#image} alt="Chess Piece" />`
        }
      }
    } catch (error) {
      console.log('Piece Paint In Square Error')
    }
  }

  unpaintInSquare (): void {
    try {
      if (this.#square !== undefined) {
        const squareElementId = `square-piece-${this.#square.xPosition}-${this.#square.yPosition}`
        const squareElement = document.getElementById(squareElementId)
        if (squareElement !== null) {
          squareElement.querySelector('img')?.remove()
        }
      }
    } catch (error) {
      console.log('Piece Unpaint In Square Error')
    }
  }
}
