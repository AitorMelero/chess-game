import { PieceFilters, isMoveInCheck, isCheckmate, isCheck } from '../helpers'
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
import { type GameHistoryModelType } from '../types/GameHistory'
import { GameHistoryModel } from './GameHistoryModel'

export class ChessboardModel implements ChessboardModelType {
  readonly #players: PlayerModelType[]
  readonly #squares: SquareModelType[]
  readonly #gameHistory: GameHistoryModelType
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
    this.#gameHistory = new GameHistoryModel()
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
    this.squares.forEach(square => { square.unpaintSelected() })
    squareSelected.paintSelected()
    if (squareSelected.piece !== undefined) {
      const squarePiece = squareSelected.piece
      squarePiece.possibleNextSquares = squarePiece.calculatePossibleNextSquares().filter(
        square => !isMoveInCheck(squarePiece, square)
      )
      squarePiece.possibleNextSquares.forEach(square => { square.paintPossibleMove() })
      this.#currentPiece = squareSelected.piece
    }
  }

  private unselectSquare (squareUnselected: SquareModelType): void {
    squareUnselected.unpaintSelected()
    // squareUnselected.piece?.calculatePossibleNextSquares().forEach(square => { square.unpaintPossibleMove() })
    this.squares.forEach(square => { square.unpaintPossibleMove() })
  }

  private isAmbiguity (piece: PieceModelType, newSquare: SquareModelType): boolean {
    let otherPiece: PieceModelType | undefined
    let isAmbiguity = false

    if (piece instanceof RookModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof RookModel && p !== piece)
    } else if (piece instanceof KnightModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof KnightModel && p !== piece)
    } else if (piece instanceof BishopModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof BishopModel && p !== piece)
    } else if (piece instanceof QueenModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof QueenModel && p !== piece)
    }

    if (otherPiece !== undefined) {
      const hasEqualPossibleSquare = otherPiece.calculatePossibleNextSquares().find(square =>
        square === newSquare
      ) !== undefined

      if (hasEqualPossibleSquare) {
        isAmbiguity = true
      }
    }

    return isAmbiguity
  }

  private isVerticalAmbiguity (piece: PieceModelType, newSquare: SquareModelType): boolean {
    let otherPiece: PieceModelType | undefined
    let isAmbiguity = false

    if (piece instanceof RookModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof RookModel && p !== piece)
    } else if (piece instanceof KnightModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof KnightModel && p !== piece)
    } else if (piece instanceof BishopModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof BishopModel && p !== piece)
    } else if (piece instanceof QueenModel) {
      otherPiece = this.pieces.find(p => p.isWhite === piece.isWhite && p instanceof QueenModel && p !== piece)
    }

    if (otherPiece !== undefined) {
      const hasEqualPossibleSquare = otherPiece.calculatePossibleNextSquares().find(square =>
        square === newSquare
      ) !== undefined

      if (hasEqualPossibleSquare && piece.square?.xPosition === otherPiece.square?.xPosition) {
        isAmbiguity = true
      }
    }

    return isAmbiguity
  }

  private selectPossibleMoveSquare (squaredSelected: SquareModelType): void {
    if (this.currentPiece?.square !== undefined) {
      const oldSquare = this.currentPiece.square
      const newSquare = squaredSelected
      const piece = this.currentPiece
      const isVerticalAmbiguity = this.isVerticalAmbiguity(piece, squaredSelected)
      const isHorizontalAmbiguity = isVerticalAmbiguity ? false : this.isAmbiguity(piece, squaredSelected)
      const isEatEnPassant = piece instanceof PawnModel &&
        oldSquare.xPosition !== newSquare.xPosition &&
        newSquare.piece === undefined
      let eatenPiece = squaredSelected.piece
      let isCheckPlay = false
      let isMate = false
      let isCastling = false

      // Check if pawn is eating en passant
      if (isEatEnPassant) {
        eatenPiece = this.pieces.find(piece =>
          piece.isWhite !== this.currentPlayer.isWhite && piece.square === undefined && piece instanceof PawnModel
        )
        this.#possibleEnPassant = undefined
      }

      // Check if is castling
      if (this.isCastlingMove(squaredSelected)) {
        this.moveRookInCastling(squaredSelected)
        isCastling = true
      }

      // Paint piece move
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
          this.showCheckmateModal()
          isMate = true
        } else if (isCheck(this)) {
          isCheckPlay = true
        }
      }

      // Save play in Game History
      this.gameHistory.addPlay(
        oldSquare,
        newSquare,
        piece,
        eatenPiece,
        isEatEnPassant,
        isCheckPlay,
        isMate,
        isCastling,
        isHorizontalAmbiguity,
        isVerticalAmbiguity
      )
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
      rook.paintInSquare(rookNewSquare)
      rookNewSquare.unpaintPossibleMove()
    }
  }

  private checkPossibleEnPassant (squaredSelected: SquareModelType): void {
    if (this.currentPiece instanceof PawnModel) {
      if (this.possibleEnPassant?.square === squaredSelected) {
        // Eat en passant
        this.possibleEnPassant.pawn.unpaintInSquare()
        this.possibleEnPassant = undefined
      } else if (this.currentPiece instanceof PawnModel) {
        // Possible en passant
        if (this.currentPiece.isWhite) {
          if (this.currentPiece.square?.yPosition === squaredSelected.yPosition - 2) {
            this.possibleEnPassant = {
              pawn: this.currentPiece,
              square: this.getSquareFromPosition({
                xPosition: squaredSelected.xPosition,
                yPosition: squaredSelected.yPosition - 1
              })
            }
          }
        } else {
          if (this.currentPiece.square?.yPosition === squaredSelected.yPosition + 2) {
            this.possibleEnPassant = {
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
  }

  get players (): PlayerModelType[] {
    return this.#players
  }

  get currentPlayer (): PlayerModelType {
    return this.#currentPlayer
  }

  set currentPlayer (currentPlayer: PlayerModelType) {
    this.#currentPlayer = currentPlayer
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

  set currentPiece (currentPiece: PieceModelType | undefined) {
    this.#currentPiece = currentPiece
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

  set possibleEnPassant (possibleEnPassant: PossibleEnPassant | undefined) {
    this.#possibleEnPassant = possibleEnPassant
  }

  get gameHistory (): GameHistoryModelType {
    return this.#gameHistory
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
      console.log(popupElement)

      const popupChoosePieceElement = document.getElementById('popup-choose-piece')

      if (popupChoosePieceElement !== null) {
        popupChoosePieceElement.hidden = false

        const queenButtonElement = document.getElementById('button-choose-queen')
        const bishopButtonElement = document.getElementById('button-choose-bishop')
        const knightButtonElement = document.getElementById('button-choose-knight')
        const rookButtonElement = document.getElementById('button-choose-rook')

        if (queenButtonElement instanceof HTMLImageElement) {
          queenButtonElement.src = `/assets/Pieces/${colorLetter}q.png`
        }
        if (bishopButtonElement instanceof HTMLImageElement) {
          bishopButtonElement.src = `/assets/Pieces/${colorLetter}b.png`
        }
        if (knightButtonElement instanceof HTMLImageElement) {
          knightButtonElement.src = `/assets/Pieces/${colorLetter}n.png`
        }
        if (rookButtonElement instanceof HTMLImageElement) {
          rookButtonElement.src = `/assets/Pieces/${colorLetter}r.png`
        }
      }
    }
  }

  showCheckmateModal = (): void => {
    const popupElement = document.getElementById('popup-root')
    if (popupElement instanceof HTMLDivElement) {
      popupElement.hidden = false
      const popupCheckmateElement = document.getElementById('popup-checkmate')

      if (popupCheckmateElement !== null) {
        popupCheckmateElement.hidden = false
      }
    }
  }

  hideCheckmateModal = (): void => {
    const popupElement = document.getElementById('popup-root')
    if (popupElement instanceof HTMLDivElement) {
      const popupCheckmateElement = document.getElementById('popup-checkmate')
      if (popupCheckmateElement !== null) {
        popupCheckmateElement.hidden = true
      }

      popupElement.hidden = true
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

        // Save new piece in history game
        const currentPlay = this.gameHistory.chessboardHistory[this.gameHistory.currentPlayIndex]
        currentPlay.piece = newPiece
        currentPlay.isChangePawn = this.currentChangePawn

        newPiece.paintInSquare(this.currentChangePawn.square)
        this.#currentPiece = newPiece
        this.#pieces = [...this.pieces.filter(piece => piece !== this.currentChangePawn), newPiece]
        this.#currentChangePawn = undefined

        const popupElement = document.getElementById('popup-root')
        if (popupElement instanceof HTMLDivElement) {
          const popupChoosePieceElement = document.getElementById('popup-choose-piece')
          if (popupChoosePieceElement !== null) {
            popupChoosePieceElement.hidden = true
          }

          popupElement.hidden = true
        }
      }
    }
  }

  restartGame = (): void => {
    this.players.forEach(player => { player.pieces = [] })
    this.pieces.forEach(piece => { piece.unpaintInSquare() })
    this.#pieces = []
    this.squares.forEach(square => {
      square.piece = undefined
      square.unpaintSelected()
      square.unpaintPossibleMove()
    })
    this.#whiteKing = undefined
    this.#blackKing = undefined
    this.#currentPlayer = this.players[0]
    this.#currentPiece = undefined
    this.#currentChangePawn = undefined
    this.#possibleEnPassant = undefined
    this.#gameHistory.restart()
    this.createPieces()
    this.hideCheckmateModal()
  }
}
