import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class SquareModel implements SquareModelType {
  readonly #chessboard: ChessboardModelType
  readonly #xPosition: number
  readonly #yPosition: number
  readonly #squareIdElement: string
  #isSelected: boolean
  readonly #squareSelectedIdElement: string
  #isPossibleMove: boolean
  readonly #squarePossibleMoveIdElement: string
  #piece: PieceModelType | undefined
  readonly #squarePieceIdElement: string

  constructor (chessboard: ChessboardModelType, xPosition: number, yPosition: number) {
    this.#chessboard = chessboard
    this.#xPosition = xPosition
    this.#yPosition = yPosition
    this.#squareIdElement = `square-${xPosition}-${yPosition}`
    this.#isSelected = false
    this.#squareSelectedIdElement = `square-selected-${xPosition}-${yPosition}`
    this.#isPossibleMove = false
    this.#squarePossibleMoveIdElement = `square-possible-move-${xPosition}-${yPosition}`
    this.#piece = undefined
    this.#squarePieceIdElement = `square-piece-${xPosition}-${yPosition}`
  }

  get chessboard (): ChessboardModelType {
    return this.#chessboard
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

  get squarePieceIdElement (): string {
    return this.#squarePieceIdElement
  }

  get isPainted (): boolean {
    return document.getElementById(this.squareIdElement) !== null
  }

  paintSelected (): void {
    try {
      const squareSelectedElement = document.getElementById(this.squareSelectedIdElement)
      if (squareSelectedElement !== null) {
        squareSelectedElement.className = 'selected-square'
        this.#isSelected = true
      }
    } catch (error) {
      console.log('Error: Square Paint Selected\n', error)
    }
  }

  unpaintSelected (): void {
    try {
      const squareSelectedElement = document.getElementById(this.squareSelectedIdElement)
      if (squareSelectedElement !== null) {
        squareSelectedElement.className = 'not-selected-square'
        this.#isSelected = false
      }
    } catch (error) {
      console.log('Error: Square Unpaint Selected\n', error)
    }
  }

  paintPossibleMove (): void {
    try {
      const squarePossibleMoveElement = document.getElementById(this.squarePossibleMoveIdElement)
      if (squarePossibleMoveElement !== null) {
        this.enableButton()
        squarePossibleMoveElement.className = 'possible-move-square'
        this.#isPossibleMove = true
      }
    } catch (error) {
      console.log('Error: Square Paint Possible Move\n', error)
    }
  }

  unpaintPossibleMove (): void {
    try {
      const squarePossibleMoveElement = document.getElementById(this.squarePossibleMoveIdElement)
      if (squarePossibleMoveElement !== null) {
        if (this.piece === undefined) {
          this.disableButton()
        }
        squarePossibleMoveElement.className = 'not-possible-move-square'
        this.#isPossibleMove = false
      }
    } catch (error) {
      console.log('Square Unpaint Possible Move Error')
    }
  }

  enableButton (): void {
    const squareElement = document.getElementById(this.squareIdElement) as HTMLButtonElement
    if (squareElement !== null) {
      squareElement.disabled = false
      squareElement.onclick = () => { this.chessboard.clickSquare(this) }
    } else {
      throw new Error('Square Enable Button')
    }
  }

  disableButton (): void {
    const squareElement = document.getElementById(this.squareIdElement) as HTMLButtonElement
    if (squareElement !== null) {
      squareElement.disabled = true
      squareElement.removeAttribute('onclick')
    } else {
      throw new Error('Square Disable Button')
    }
  }

  paintPiece (piece: PieceModelType): void {
    const squarePieceElement = document.getElementById(this.squarePieceIdElement)
    if (squarePieceElement !== null) {
      squarePieceElement.innerHTML = `<img src=${piece.image} alt="Chess Piece" />`
      this.piece = piece
    } else {
      throw new Error('Square Paint Piece')
    }
  }

  unpaintPiece (): void {
    const squarePieceElement = document.getElementById(this.squarePieceIdElement)
    if (squarePieceElement !== null) {
      squarePieceElement.querySelector('img')?.remove()
      this.piece = undefined
    } else {
      throw new Error('Square Unpaint Piece')
    }
  }
}
