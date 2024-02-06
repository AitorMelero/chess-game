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

  paintInSquare (): void {
    try {
      if (this.#square !== null) {
        const squareElementId = `square-piece-${this.#square.xPosition}-${this.#square.yPosition}`
        const squareElement = document.getElementById(squareElementId)
        if (squareElement !== null) {
          squareElement.outerHTML = `<img src={${this.#svgImage}} className="w-[85%] h-[85%]" alt="Chess Piece" />`
        }
      }
    } catch (error) {
      console.log('Piece Paint In Square Error')
    }
  }

  unpaintInSquare (): void {
    try {
      if (this.#square !== null) {
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
