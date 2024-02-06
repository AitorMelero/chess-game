import { blackBishopPositionFilter, blackKingPositionFilter, blackKnightPositionFilter, blackPawnPositionFilter, blackQueenPositionFilter, blackRookPositionFilter, filterPieces, whiteBishopPositionFilter, whiteKingPositionFilter, whiteKnightPositionFilter, whitePawnPositionFilter, whiteQueenPositionFilter, whiteRookPositionFilter } from '../helpers/PIeceFilters'
import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type PlayerModelType } from '../types/Player'
import { type SquareModelType } from '../types/Square'
import { BishopModel } from './BishopModel'
import { KingModel } from './KingModel'
import { KnightModel } from './KnightModel'
import { PawnModel } from './PawnModel'
import { PlayerModel } from './PlayerModel'
import { QueenModel } from './QueenModel'
import { RookModel } from './RookModel'
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
    this.#squares = []
    this.#possibleNextSquares = []
    this.#currentPiece = null
    this.createChessboard()
  }

  private createChessboard (): void {
    this.createSquares()
    this.createPieces()
  }

  private createSquares (): void {
    const CHESSBOARD_LEN = 8

    // Create squares from left top to right bottom
    for (let y = CHESSBOARD_LEN; y > 0; y--) {
      for (let x = 1; x <= CHESSBOARD_LEN; x++) {
        const newSquare = new SquareModel(x, y)
        this.#squares.push(newSquare)
      }
    }
  }

  private createPieces (): void {
    const isWhite = true

    // Pawns
    filterPieces(this.#squares, square => whitePawnPositionFilter(square)).forEach(square => {
      const piece = new PawnModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    filterPieces(this.#squares, square => blackPawnPositionFilter(square)).forEach(square => {
      const piece = new PawnModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Rooks
    filterPieces(this.#squares, square => whiteRookPositionFilter(square)).forEach(square => {
      const piece = new RookModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    filterPieces(this.#squares, square => blackRookPositionFilter(square)).forEach(square => {
      const piece = new RookModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Knights
    filterPieces(this.#squares, square => whiteKnightPositionFilter(square)).forEach(square => {
      const piece = new KnightModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    filterPieces(this.#squares, square => blackKnightPositionFilter(square)).forEach(square => {
      const piece = new KnightModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Bishops
    filterPieces(this.#squares, square => whiteBishopPositionFilter(square)).forEach(square => {
      const piece = new BishopModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    filterPieces(this.#squares, square => blackBishopPositionFilter(square)).forEach(square => {
      const piece = new BishopModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Queens
    filterPieces(this.#squares, square => whiteQueenPositionFilter(square)).forEach(square => {
      const piece = new QueenModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    filterPieces(this.#squares, square => blackQueenPositionFilter(square)).forEach(square => {
      const piece = new QueenModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Kings
    filterPieces(this.#squares, square => whiteKingPositionFilter(square)).forEach(square => {
      const piece = new KingModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    filterPieces(this.#squares, square => blackKingPositionFilter(square)).forEach(square => {
      const piece = new KingModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })
  }

  private paintPieceInSquare (piece: PieceModelType, square: SquareModelType): void {
    piece.square = square
    piece.paintInSquare()
    this.#pieces.push(piece)
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
