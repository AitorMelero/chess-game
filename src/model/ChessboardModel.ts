import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'
import { PawnModel } from './PawnModel'
import { SquareModel } from './SquareModel'

export class ChessboardModel implements ChessboardModelType {
  readonly #squares: SquareModelType[]
  readonly #possibleNextSquares: SquareModelType[]
  readonly #currentPiece: PieceModelType | null
  readonly #pieces: PieceModelType[]

  constructor () {
    this.#pieces = []
    this.#squares = this.getInitSquares()
    this.#possibleNextSquares = []
    this.#currentPiece = null
  }

  private getInitSquares (): SquareModelType[] {
    const CHESSBOARD_LEN = 8
    const squares: SquareModelType[] = []

    // Create squares from left top to right bottom
    for (let y = CHESSBOARD_LEN; y > 0; y--) {
      for (let x = 1; x <= CHESSBOARD_LEN; x++) {
        const newSquare = new SquareModel(x, y)
        squares.push(newSquare)
        // Delete: test white pawn
        if (y === 2) {
          const newWhitePawn = new PawnModel(newSquare)
          this.#pieces.push(newWhitePawn)
        }
      }
    }

    return squares
  }

  get squares (): SquareModelType[] {
    return this.#squares
  }

  get possibleNextSquares (): SquareModelType[] {
    return this.#possibleNextSquares
  }

  get currentPiece (): PieceModelType | null {
    return this.#currentPiece
  }

  get pieces (): PieceModelType[] {
    return this.#pieces
  }
}
