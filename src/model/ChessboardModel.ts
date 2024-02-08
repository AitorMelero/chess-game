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
  #currentPiece: PieceModelType | undefined
  #pieces: PieceModelType[]

  constructor () {
    this.#players = [new PlayerModel(true), new PlayerModel(false)]
    this.#pieces = []
    this.#squares = []
    this.#currentPiece = undefined
    this.createChessboard()
  }

  private createChessboard (): void {
    this.createSquares()
  }

  private createSquares (): void {
    const CHESSBOARD_LEN = 8

    // Create squares from left top to right bottom
    for (let y = CHESSBOARD_LEN; y > 0; y--) {
      for (let x = 1; x <= CHESSBOARD_LEN; x++) {
        const newSquare = new SquareModel(this, x, y)
        this.squares.push(newSquare)
      }
    }
  }

  private paintPieceInSquare (
    piece: PieceModelType,
    square: SquareModelType
  ): void {
    piece.paintInSquare(square)
    this.pieces.push(piece)
  }

  get players (): PlayerModelType[] {
    return this.#players
  }

  get squares (): SquareModelType[] {
    return this.#squares
  }

  get currentPiece (): PieceModelType | undefined {
    return this.#currentPiece
  }

  get pieces (): PieceModelType[] {
    return this.#pieces
  }

  createPieces (): void {
    const isWhite = true

    // Init pieces
    this.#pieces = []

    // Pawns
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.whitePawnPositionFilter(square)
    ).forEach((square) => {
      const piece = new PawnModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackPawnPositionFilter(square)
    ).forEach((square) => {
      const piece = new PawnModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Rooks
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.whiteRookPositionFilter(square)
    ).forEach((square) => {
      const piece = new RookModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackRookPositionFilter(square)
    ).forEach((square) => {
      const piece = new RookModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Knights
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.whiteKnightPositionFilter(square)
    ).forEach((square) => {
      const piece = new KnightModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackKnightPositionFilter(square)
    ).forEach((square) => {
      const piece = new KnightModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Bishops
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.whiteBishopPositionFilter(square)
    ).forEach((square) => {
      const piece = new BishopModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackBishopPositionFilter(square)
    ).forEach((square) => {
      const piece = new BishopModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Queens
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.whiteQueenPositionFilter(square)
    ).forEach((square) => {
      const piece = new QueenModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackQueenPositionFilter(square)
    ).forEach((square) => {
      const piece = new QueenModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })

    // Kings
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.whiteKingPositionFilter(square)
    ).forEach((square) => {
      const piece = new KingModel(isWhite)
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackKingPositionFilter(square)
    ).forEach((square) => {
      const piece = new KingModel(!isWhite)
      this.paintPieceInSquare(piece, square)
    })
  }

  clickSquare = (squareClicked: SquareModelType): void => {
    if (squareClicked.isSelected) {
      this.unselectSquare(squareClicked)
      this.#currentPiece = undefined
    } else {
      if (this.currentPiece?.square !== undefined) {
        if (squareClicked.isPossibleMove) {
          this.selectPossibleMoveSquare(squareClicked)
        } else {
          this.unselectSquare(this.currentPiece.square)
          this.selectSquare(squareClicked)
          this.#currentPiece = squareClicked.piece
        }
      } else {
        this.selectSquare(squareClicked)
        this.#currentPiece = squareClicked.piece
      }
    }
  }

  private selectSquare (squareSelected: SquareModelType): void {
    squareSelected.paintSelected()
    squareSelected.piece?.calculatePossibleNextSquares().forEach(square => { square.paintPossibleMove() })
  }

  private unselectSquare (squareUnselected: SquareModelType): void {
    squareUnselected.unpaintSelected()
    squareUnselected.piece?.calculatePossibleNextSquares().forEach(square => { square.unpaintPossibleMove() })
  }

  private selectPossibleMoveSquare (squaredSelected: SquareModelType): void {
    if (this.#currentPiece !== undefined && this.#currentPiece.square !== undefined) {
      this.unselectSquare(this.#currentPiece.square)
      this.#currentPiece.unpaintInSquare()
      this.#currentPiece.paintInSquare(squaredSelected)
      squaredSelected.paintSelected()
      // this.#currentPiece = undefined
    }
  }
}
