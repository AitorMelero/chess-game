import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class SquareModel implements SquareModelType {
  readonly #xPosition: number
  readonly #yPosition: number
  readonly #squareIdElement: string
  #isSelected: boolean
  readonly #squareSelectedIdElement: string
  #isPossibleMove: boolean
  readonly #squarePossibleMoveIdElement: string
  #piece: PieceModelType | undefined

  constructor (xPosition: number, yPosition: number) {
    this.#xPosition = xPosition
    this.#yPosition = yPosition
    this.#squareIdElement = `square-${xPosition}-${yPosition}`
    this.#isSelected = false
    this.#squareSelectedIdElement = `square-selected-${xPosition}-${yPosition}`
    this.#isPossibleMove = false
    this.#squarePossibleMoveIdElement = `square-possible-move-${xPosition}-${yPosition}`
    this.#piece = undefined
  }

  get xPosition (): number {
    return this.#xPosition
  }

  get yPosition (): number {
    return this.#yPosition
  }

  get squareIdElement (): string {
    return this.#squareIdElement
  }

  get isSelected (): boolean {
    return this.#isSelected
  }

  get squareSelectedIdElement (): string {
    return this.#squareSelectedIdElement
  }

  get isPossibleMove (): boolean {
    return this.#isPossibleMove
  }

  get squarePossibleMoveIdElement (): string {
    return this.#squarePossibleMoveIdElement
  }

  get piece (): PieceModelType | undefined {
    return this.#piece
  }

  set piece (piece: PieceModelType | undefined) {
    this.#piece = piece
  }

  paintSelected (): void {
    try {
      const squareSelectedElement = document.getElementById(this.#squareSelectedIdElement)
      if (squareSelectedElement !== null) {
        squareSelectedElement.className = 'selected-square'
        this.#isSelected = true
      }
    } catch (error) {
      console.log('Square Paint Selected Error')
    }
  }

  unpaintSelected (): void {
    try {
      const squareSelectedElement = document.getElementById(this.#squareSelectedIdElement)
      if (squareSelectedElement !== null) {
        squareSelectedElement.className = 'not-selected-square'
        this.#isSelected = false
      }
    } catch (error) {
      console.log('Square Unpaint Selected Error')
    }
  }

  paintPossibleMove (): void {
    try {
      const squareElement = document.getElementById(this.#squareIdElement) as HTMLButtonElement
      const squarePossibleMoveElement = document.getElementById(this.#squarePossibleMoveIdElement)
      if (squareElement !== null && squarePossibleMoveElement !== null) {
        // Enable square button
        squareElement.disabled = false
        // Paint possible move
        squarePossibleMoveElement.className = 'possible-move-square'
        this.#isPossibleMove = true
      }
    } catch (error) {
      console.log('Square Paint Possible Move Error')
    }
  }

  unpaintPossibleMove (): void {
    try {
      const squareElement = document.getElementById(this.#squareIdElement) as HTMLButtonElement
      const squarePossibleMoveElement = document.getElementById(this.#squarePossibleMoveIdElement)
      if (squareElement !== null && squarePossibleMoveElement !== null) {
        // Disable (or not) square button
        squareElement.disabled = this.#piece === null
        // Unpaint possible move
        squarePossibleMoveElement.className = 'not-possible-move-square'
        this.#isPossibleMove = false
      }
    } catch (error) {
      console.log('Square Unpaint Possible Move Error')
    }
  }
}
