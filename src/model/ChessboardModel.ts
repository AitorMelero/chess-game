import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class ChessboardModel implements ChessboardModelType {
  readonly #squares: SquareModelType[]
  readonly #possibleNextSquares: SquareModelType[]
  readonly #currentPiece: PieceModelType | null
  readonly #pieces: PieceModelType[]

  constructor () {
    this.#squares = []
    this.#possibleNextSquares = []
    this.#currentPiece = null
    this.#pieces = []
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
