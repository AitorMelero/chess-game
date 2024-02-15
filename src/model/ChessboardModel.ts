import { PieceFilters, isCheck, isCheckmate } from '../helpers'
import { type PossibleEnPassant, type ChessboardModelType } from '../types/Chessboard'
import { type NewChoosePiece, type PieceModelType } from '../types/Piece'
import { type PlayerModelType } from '../types/Player'
import { type SquarePosition, type SquareModelType } from '../types/Square'
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
  #whiteKing: PieceModelType | undefined
  #blackKing: PieceModelType | undefined
  #currentPlayer: PlayerModelType
  #pieces: PieceModelType[]
  #currentPiece: PieceModelType | undefined
  #currentChangePawn: PieceModelType | undefined
  #possibleEnPassant: PossibleEnPassant | undefined

  constructor () {
    const isWhite = true
    const whitePlayer = new PlayerModel(isWhite)
    const blackPlayer = new PlayerModel(!isWhite)
    this.#players = [whitePlayer, blackPlayer]
    this.#squares = []
    this.#whiteKing = undefined
    this.#blackKing = undefined
    this.#currentPlayer = whitePlayer
    this.#pieces = []
    this.#currentPiece = undefined
    this.#currentChangePawn = undefined
    this.#possibleEnPassant = undefined
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

  private selectSquare (squareSelected: SquareModelType): void {
    squareSelected.paintSelected()
    if (squareSelected.piece !== undefined) {
      const squarePiece = squareSelected.piece
      squarePiece.possibleNextSquares = squarePiece.calculatePossibleNextSquares().filter(
        square => !isCheck(squarePiece, square)
      )
      squarePiece.possibleNextSquares.forEach(square => { square.paintPossibleMove() })
      this.#currentPiece = squareSelected.piece
    }
  }

  private unselectSquare (squareUnselected: SquareModelType): void {
    squareUnselected.unpaintSelected()
    squareUnselected.piece?.calculatePossibleNextSquares().forEach(square => { square.unpaintPossibleMove() })
  }

  private selectPossibleMoveSquare (squaredSelected: SquareModelType): void {
    if (this.currentPiece?.square !== undefined) {
      // Check if is castling
      if (this.isCastlingMove(squaredSelected)) {
        this.moveRookInCastling(squaredSelected)
      }
      this.unselectSquare(this.currentPiece.square)
      this.currentPiece.unpaintInSquare()
      this.currentPiece.paintInSquare(squaredSelected)
      squaredSelected.paintSelected()
      squaredSelected.unpaintPossibleMove()

      // Change player turn
      const newCurrentPlayer = this.players.find(player => player !== this.currentPlayer)
      if (newCurrentPlayer !== undefined) {
        this.#currentPlayer = newCurrentPlayer
        // Check if is checkmate
        if (isCheckmate(this)) {
          console.log('Checkmate')
        }
      }
    }
  }

  private isCastlingMove (squaredSelected: SquareModelType): boolean {
    let isCastling = false

    if (this.currentPiece instanceof KingModel) {
      const pieceCurrentSquare = this.currentPiece?.square
      if (pieceCurrentSquare !== undefined) {
        if (pieceCurrentSquare.xPosition === squaredSelected.xPosition - 2 ||
          pieceCurrentSquare.xPosition === squaredSelected.xPosition + 2) {
          isCastling = true
        }
      }
    }

    return isCastling
  }

  private moveRookInCastling (squaredSelected: SquareModelType): void {
    let rook: PieceModelType | undefined
    let rookCurrentSquare: SquareModelType | undefined
    let rookNewSquare: SquareModelType | undefined

    if (squaredSelected.xPosition === 7 && squaredSelected.yPosition === 1) {
      rookCurrentSquare = this.getSquareFromPosition({ xPosition: 8, yPosition: 1 })
      rookNewSquare = this.getSquareFromPosition({ xPosition: 6, yPosition: 1 })
      rook = rookCurrentSquare?.piece
    } else if (squaredSelected.xPosition === 7 && squaredSelected.yPosition === 8) {
      rookCurrentSquare = this.getSquareFromPosition({ xPosition: 8, yPosition: 8 })
      rookNewSquare = this.getSquareFromPosition({ xPosition: 6, yPosition: 8 })
      rook = rookCurrentSquare?.piece
    } else if (squaredSelected.xPosition === 3 && squaredSelected.yPosition === 1) {
      rookCurrentSquare = this.getSquareFromPosition({ xPosition: 1, yPosition: 1 })
      rookNewSquare = this.getSquareFromPosition({ xPosition: 4, yPosition: 1 })
      rook = rookCurrentSquare?.piece
    } else {
      rookCurrentSquare = this.getSquareFromPosition({ xPosition: 1, yPosition: 8 })
      rookNewSquare = this.getSquareFromPosition({ xPosition: 4, yPosition: 8 })
      rook = rookCurrentSquare?.piece
    }

    // Paint move rook
    if (rookCurrentSquare !== undefined && rookNewSquare !== undefined && rook !== undefined) {
      rookCurrentSquare.unpaintPiece()
      rookNewSquare.paintPiece(rook)
      rookNewSquare.unpaintPossibleMove()
    }
  }

  private checkPossibleEnPassant (squaredSelected: SquareModelType): void {
    let possibleEnPassant: PossibleEnPassant | undefined

    if (this.currentPiece instanceof PawnModel) {
      if (this.possibleEnPassant?.square === squaredSelected) {
        // Eat en passant
        this.possibleEnPassant.pawn.unpaintInSquare()
        this.#possibleEnPassant = undefined
      } else if (this.currentPiece instanceof PawnModel) {
        // Possible en passant
        if (this.currentPiece.isWhite) {
          if (this.currentPiece.square?.yPosition === squaredSelected.yPosition - 2) {
            possibleEnPassant = {
              pawn: this.currentPiece,
              square: this.getSquareFromPosition({
                xPosition: squaredSelected.xPosition,
                yPosition: squaredSelected.yPosition - 1
              })
            }
          }
        } else {
          if (this.currentPiece.square?.yPosition === squaredSelected.yPosition + 2) {
            possibleEnPassant = {
              pawn: this.currentPiece,
              square: this.getSquareFromPosition({
                xPosition: squaredSelected.xPosition,
                yPosition: squaredSelected.yPosition + 1
              })
            }
          }
        }
      }
    }

    this.#possibleEnPassant = possibleEnPassant
  }

  get players (): PlayerModelType[] {
    return this.#players
  }

  get currentPlayer (): PlayerModelType {
    return this.#currentPlayer
  }

  get squares (): SquareModelType[] {
    return this.#squares
  }

  get whiteKing (): PieceModelType | undefined {
    return this.#whiteKing
  }

  get blackKing (): PieceModelType | undefined {
    return this.#blackKing
  }

  get currentPiece (): PieceModelType | undefined {
    return this.#currentPiece
  }

  get pieces (): PieceModelType[] {
    return this.#pieces
  }

  get currentChangePawn (): PieceModelType | undefined {
    return this.#currentChangePawn
  }

  get possibleEnPassant (): PossibleEnPassant | undefined {
    return this.#possibleEnPassant
  }

  getSquareFromPosition (squarePosition: SquarePosition): SquareModelType | undefined {
    return this.squares.find(
      square =>
        square.xPosition === squarePosition.xPosition &&
        square.yPosition === squarePosition.yPosition
    )
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
      this.#whiteKing = piece
      this.paintPieceInSquare(piece, square)
    })
    PieceFilters.positionFilter(this.squares, (square) =>
      PieceFilters.blackKingPositionFilter(square)
    ).forEach((square) => {
      const piece = new KingModel(!isWhite)
      this.#blackKing = piece
      this.paintPieceInSquare(piece, square)
    })
  }

  clickSquare = (squareClicked: SquareModelType): void => {
    const isYourTurn = squareClicked.piece?.isWhite === this.currentPlayer.isWhite || squareClicked.isPossibleMove

    if (isYourTurn) {
      if (squareClicked.isSelected) {
        this.unselectSquare(squareClicked)
        this.#currentPiece = undefined
      } else {
        if (this.currentPiece?.square !== undefined) {
          if (squareClicked.isPossibleMove) {
            this.checkPossibleEnPassant(squareClicked)
            this.selectPossibleMoveSquare(squareClicked)
          } else {
            this.unselectSquare(this.currentPiece.square)
            this.selectSquare(squareClicked)
          }
        } else {
          this.selectSquare(squareClicked)
        }
      }
    }
  }

  showChangePawnModal = (pawn: PieceModelType): void => {
    let colorLetter = 'b'
    if (pawn.isWhite) {
      colorLetter = 'w'
    }

    this.#currentChangePawn = pawn

    const popupElement = document.getElementById('popup-root')
    if (popupElement instanceof HTMLDivElement) {
      popupElement.hidden = false
      const popupChoosePieceElement = document.getElementById('popup-choose-piece')

      if (popupChoosePieceElement !== null) {
        popupChoosePieceElement.hidden = false

        const queenButtonElement = document.getElementById('button-choose-queen')
        const bishopButtonElement = document.getElementById('button-choose-bishop')
        const knightButtonElement = document.getElementById('button-choose-knight')
        const rookButtonElement = document.getElementById('button-choose-rook')

        if (queenButtonElement instanceof HTMLImageElement) {
          queenButtonElement.src = `./src/assets/Pieces/${colorLetter}q.png`
        }
        if (bishopButtonElement instanceof HTMLImageElement) {
          bishopButtonElement.src = `./src/assets/Pieces/${colorLetter}b.png`
        }
        if (knightButtonElement instanceof HTMLImageElement) {
          knightButtonElement.src = `./src/assets/Pieces/${colorLetter}n.png`
        }
        if (rookButtonElement instanceof HTMLImageElement) {
          rookButtonElement.src = `./src/assets/Pieces/${colorLetter}r.png`
        }
      }
    }
  }

  changePawn = (newTypePiece: NewChoosePiece): void => {
    if (this.currentChangePawn !== undefined) {
      if (this.currentChangePawn.square !== undefined) {
        const isWhite = this.currentChangePawn.isWhite
        const newPiece = newTypePiece === 'Queen'
          ? new QueenModel(isWhite)
          : newTypePiece === 'Bishop'
            ? new BishopModel(isWhite)
            : newTypePiece === 'Knight'
              ? new KnightModel(isWhite)
              : new RookModel(isWhite)

        newPiece.paintInSquare(this.currentChangePawn.square)
        this.#currentPiece = newPiece
        this.#pieces = [...this.pieces.filter(piece => piece !== this.currentChangePawn), newPiece]
        this.#currentChangePawn = undefined

        const popupElement = document.getElementById('popup-root')
        if (popupElement instanceof HTMLDivElement) {
          popupElement.hidden = true

          const popupChoosePieceElement = document.getElementById('popup-choose-piece')
          if (popupChoosePieceElement !== null) {
            popupChoosePieceElement.hidden = true
          }
        }
      }
    }
  }
}
