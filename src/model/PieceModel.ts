import { type PieceModelType } from '../types/Piece'
import { type SquarePosition, type SquareModelType } from '../types/Square'

export abstract class PieceModel implements PieceModelType {
  readonly #svgImage: string
  readonly #initPosition: SquarePosition
  #square: SquareModelType | undefined

  constructor (svgImage: string, initPosition: SquarePosition) {
    this.#svgImage = svgImage
    this.#initPosition = initPosition
    this.#square = undefined
  }

  get svgImage (): string {
    return this.#svgImage
  }

  get initPosition (): SquarePosition {
    return this.#initPosition
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
          squareElement.innerHTML = `<img src=${this.#svgImage} alt="Chess Piece" />`
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
