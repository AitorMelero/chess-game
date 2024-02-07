import { PieceFilters } from '../helpers'
import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type PlayerModelType } from '../types/Player'
import { type SquareModelType } from '../types/Square'
import {
  BishopModel,
  KingModel,
  KnightModel,
  PawnModel,
  PlayerModel,
  QueenModel,
  RookModel,
  SquareModel
} from '.'

export class ChessboardModel implements ChessboardModelType {
  readonly #players: PlayerModelType[]
  readonly #squares: SquareModelType[]
  readonly #possibleNextSquares: SquareModelType[]
  readonly #currentPiece: PieceModelType | undefined
  readonly #pieces: PieceModelType[]

  constructor () {
    this.#players = [new PlayerModel(true), new PlayerModel(false)]
    this.#pieces = []
    this.#squares = []
    this.#possibleNextSquares = []
    this.#currentPiece = undefined
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
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.whitePawnPositionFilter(square)
    ).forEach((square) => {
      const piece = new PawnModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.blackPawnPositionFilter(square)
    ).forEach((square) => {
      const piece = new PawnModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Rooks
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.whiteRookPositionFilter(square)
    ).forEach((square) => {
      const piece = new RookModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.blackRookPositionFilter(square)
    ).forEach((square) => {
      const piece = new RookModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Knights
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.whiteKnightPositionFilter(square)
    ).forEach((square) => {
      const piece = new KnightModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.blackKnightPositionFilter(square)
    ).forEach((square) => {
      const piece = new KnightModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Bishops
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.whiteBishopPositionFilter(square)
    ).forEach((square) => {
      const piece = new BishopModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.blackBishopPositionFilter(square)
    ).forEach((square) => {
      const piece = new BishopModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Queens
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.whiteQueenPositionFilter(square)
    ).forEach((square) => {
      const piece = new QueenModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.blackQueenPositionFilter(square)
    ).forEach((square) => {
      const piece = new QueenModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Kings
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.whiteKingPositionFilter(square)
    ).forEach((square) => {
      const piece = new KingModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.#squares, (square) =>
      PieceFilters.blackKingPositionFilter(square)
    ).forEach((square) => {
      const piece = new KingModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })
  }

  private paintPieceInSquare (
    piece: PieceModelType,
    square: SquareModelType
  ): void {
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

  get currentPiece (): PieceModelType | undefined {
    return this.#currentPiece
  }

  get pieces (): PieceModelType[] {
    return this.#pieces
  }
}
