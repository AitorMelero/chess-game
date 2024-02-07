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
        const squarePieceElementId = `square-piece-${this.#square.xPosition}-${this.#square.yPosition}`
        const squarePieceElement = document.getElementById(squarePieceElementId)
        const squareElement = document.getElementById(this.#square.squareIdElement) as HTMLButtonElement
        if (squarePieceElement !== null) {
          squarePieceElement.innerHTML = `<img src=${this.#image} alt="Chess Piece" />`
          // Enable square button
          squareElement.disabled = false
        }
      }
    } catch (error) {
      console.log('Piece Paint In Square Error')
    }
  }

  unpaintInSquare (): void {
    try {
      if (this.#square !== undefined) {
        const squarePieceElementId = `square-piece-${this.#square.xPosition}-${this.#square.yPosition}`
        const squarePieceElement = document.getElementById(squarePieceElementId)
        const squareElement = document.getElementById(this.#square.squareIdElement) as HTMLButtonElement
        if (squarePieceElement !== null) {
          squarePieceElement.querySelector('img')?.remove()
          // Disabled square button
          squareElement.disabled = true
        }
      }
    } catch (error) {
      console.log('Piece Unpaint In Square Error')
    }
  }
}
