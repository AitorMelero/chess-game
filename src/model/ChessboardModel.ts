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
    this.filterPieces(square => this.whitePawnPositionFilter(square)).forEach(square => {
      const piece = new PawnModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    this.filterPieces(square => this.blackPawnPositionFilter(square)).forEach(square => {
      const piece = new PawnModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Rooks
    this.filterPieces(square => this.whiteRookPositionFilter(square)).forEach(square => {
      const piece = new RookModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    this.filterPieces(square => this.blackRookPositionFilter(square)).forEach(square => {
      const piece = new RookModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Knights
    this.filterPieces(square => this.whiteKnightPositionFilter(square)).forEach(square => {
      const piece = new KnightModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    this.filterPieces(square => this.blackKnightPositionFilter(square)).forEach(square => {
      const piece = new KnightModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Bishops
    this.filterPieces(square => this.whiteBishopPositionFilter(square)).forEach(square => {
      const piece = new BishopModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    this.filterPieces(square => this.blackBishopPositionFilter(square)).forEach(square => {
      const piece = new BishopModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Queens
    this.filterPieces(square => this.whiteQueenPositionFilter(square)).forEach(square => {
      const piece = new QueenModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    this.filterPieces(square => this.blackQueenPositionFilter(square)).forEach(square => {
      const piece = new QueenModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Kings
    this.filterPieces(square => this.whiteKingPositionFilter(square)).forEach(square => {
      const piece = new KingModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    this.filterPieces(square => this.blackKingPositionFilter(square)).forEach(square => {
      const piece = new KingModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })
  }

  private filterPieces (piecePositionFilter: (square: SquareModelType) => boolean): SquareModelType[] {
    return this.#squares.filter(piecePositionFilter)
  }

  private paintPieceInSquare (piece: PieceModelType, square: SquareModelType): void {
    piece.square = square
    piece.paintInSquare()
    this.#pieces.push(piece)
  }

  private whitePawnPositionFilter (square: SquareModelType): boolean {
    return square.yPosition === 2
  }

  private blackPawnPositionFilter (square: SquareModelType): boolean {
    return square.yPosition === 7
  }

  private whiteRookPositionFilter (square: SquareModelType): boolean {
    return (square.xPosition === 1 && square.yPosition === 1) || (square.xPosition === 8 && square.yPosition === 1)
  }

  private blackRookPositionFilter (square: SquareModelType): boolean {
    return (square.xPosition === 1 && square.yPosition === 8) || (square.xPosition === 8 && square.yPosition === 8)
  }

  private whiteKnightPositionFilter (square: SquareModelType): boolean {
    return (square.xPosition === 2 && square.yPosition === 1) || (square.xPosition === 7 && square.yPosition === 1)
  }

  private blackKnightPositionFilter (square: SquareModelType): boolean {
    return (square.xPosition === 2 && square.yPosition === 8) || (square.xPosition === 7 && square.yPosition === 8)
  }

  private whiteBishopPositionFilter (square: SquareModelType): boolean {
    return (square.xPosition === 3 && square.yPosition === 1) || (square.xPosition === 6 && square.yPosition === 1)
  }

  private blackBishopPositionFilter (square: SquareModelType): boolean {
    return (square.xPosition === 3 && square.yPosition === 8) || (square.xPosition === 6 && square.yPosition === 8)
  }

  private whiteQueenPositionFilter (square: SquareModelType): boolean {
    return square.xPosition === 4 && square.yPosition === 1
  }

  private blackQueenPositionFilter (square: SquareModelType): boolean {
    return square.xPosition === 4 && square.yPosition === 8
  }

  private whiteKingPositionFilter (square: SquareModelType): boolean {
    return square.xPosition === 5 && square.yPosition === 1
  }

  private blackKingPositionFilter (square: SquareModelType): boolean {
    return square.xPosition === 5 && square.yPosition === 8
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
