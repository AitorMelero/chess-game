import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'
import { SquareModel } from './SquareModel'

export class ChessboardModel implements ChessboardModelType {
  readonly #squares: SquareModelType[]
  readonly #possibleNextSquares: SquareModelType[]
  readonly #currentPiece: PieceModelType | null
  readonly #pieces: PieceModelType[]

  constructor () {
    this.#squares = this.getInitSquares()
    this.#possibleNextSquares = []
    this.#currentPiece = null
    this.#pieces = []
  }

  private getInitSquares (): SquareModelType[] {
    const CHESSBOARD_LEN = 8
    const squares: SquareModelType[] = []

    // Create squares from left top to right bottom
    for (let y = CHESSBOARD_LEN; y > 0; y--) {
      for (let x = 1; x <= CHESSBOARD_LEN; x++) {
        squares.push(new SquareModel(x, y))
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
