import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type PlayerModelType } from '../types/Player'
import { type SquareModelType } from '../types/Square'
import { PawnModel } from './PawnModel'
import { PlayerModel } from './PlayerModel'
import { SquareModel } from './SquareModel'

export class ChessboardModel implements ChessboardModelType {
  readonly #players: PlayerModelType[]
  readonly #squares: SquareModelType[]
  readonly #possibleNextSquares: SquareModelType[]
  readonly #currentPiece: PieceModelType | null
  readonly #pieces: PieceModelType[]

  constructor () {
    this.#players = [new PlayerModel(true), new PlayerModel(false)]
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
          const playerWhite = this.#players.find(player => player.isWhite)
          if (playerWhite !== undefined) {
            const newWhitePawn = new PawnModel(playerWhite)
            newWhitePawn.square = newSquare
            newWhitePawn.paintInSquare()
            this.#pieces.push(newWhitePawn)
          }
        }
      }
    }

    return squares
  }

  get players (): PlayerModelType[] {
    return this.#players
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
