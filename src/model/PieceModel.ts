import { type PieceModelType } from '../types/Piece'
import { type PlayerModelType } from '../types/Player'
import { type SquareModelType } from '../types/Square'

export abstract class PieceModel implements PieceModelType {
  readonly #player: PlayerModelType
  readonly #image: string
  #square: SquareModelType | undefined

  constructor (image: string, player: PlayerModelType) {
    this.#player = player
    this.#image = image
    this.#square = undefined
  }

  get player (): PlayerModelType {
    return this.#player
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
