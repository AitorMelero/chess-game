import { RookModel } from '.'
import { getKingNextPossibleMoves, isCheckInSquare, isKingInCheck } from '../helpers'
import { type PieceModelType } from '../types/Piece'
import { type SquarePosition, type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class KingModel extends PieceModel {
  #isFirstMove: boolean

  constructor (isWhite: boolean) {
    const whiteKingImage = '/assets/Pieces/wk.png'
    const blackKingImage = '/assets/Pieces/bk.png'
    const image = isWhite ? whiteKingImage : blackKingImage
    super(image, isWhite)
    this.#isFirstMove = true
  }

  get isFirstMove (): boolean {
    return this.#isFirstMove
  }

  set isFirstMove (isFirstMove: boolean) {
    this.#isFirstMove = isFirstMove
  }

  private isShortCastling (): boolean {
    let isShortCastling = true

    if (isKingInCheck(this.square, this.isWhite)) {
      isShortCastling = false
    } else if (!this.isFirstMoveRookInShortCastling() || !this.isFirstMove) {
      isShortCastling = false
    } else if (!this.isFreeWayInShortCastling()) {
      isShortCastling = false
    } else if (this.isCheckInShortCastlingMove()) {
      isShortCastling = false
    }

    return isShortCastling
  }

  private isLongCastling (): boolean {
    let isLongCastling = true

    if (isKingInCheck(this.square, this.isWhite)) {
      isLongCastling = false
    } else if (!this.isFirstMoveRookInLongCastling() || !this.isFirstMove) {
      isLongCastling = false
    } else if (!this.isFreeWayInLongCastling()) {
      isLongCastling = false
    } else if (this.isCheckInLongCastlingMove()) {
      isLongCastling = false
    }

    return isLongCastling
  }

  private getShortCastlingSquares (): SquareModelType[] {
    const shortCastlingSquares: SquareModelType[] = []
    let castilingSquare1: SquareModelType | undefined
    let castilingSquare2: SquareModelType | undefined

    if (this.square !== undefined) {
      if (this.isWhite) {
        castilingSquare1 = this.square.chessboard.getSquareFromPosition({ xPosition: 6, yPosition: 1 })
        castilingSquare2 = this.square.chessboard.getSquareFromPosition({ xPosition: 7, yPosition: 1 })
        if (castilingSquare1 !== undefined && castilingSquare2 !== undefined) {
          shortCastlingSquares.push(castilingSquare1)
          shortCastlingSquares.push(castilingSquare2)
        }
      } else {
        castilingSquare1 = this.square.chessboard.getSquareFromPosition({ xPosition: 6, yPosition: 8 })
        castilingSquare2 = this.square.chessboard.getSquareFromPosition({ xPosition: 7, yPosition: 8 })
        if (castilingSquare1 !== undefined && castilingSquare2 !== undefined) {
          shortCastlingSquares.push(castilingSquare1)
          shortCastlingSquares.push(castilingSquare2)
        }
      }
    }

    return shortCastlingSquares
  }

  private getLongCastlingSquares (): SquareModelType[] {
    const shortCastlingSquares: SquareModelType[] = []
    let castilingSquare1: SquareModelType | undefined
    let castilingSquare2: SquareModelType | undefined

    if (this.square !== undefined) {
      if (this.isWhite) {
        castilingSquare1 = this.square.chessboard.getSquareFromPosition({ xPosition: 3, yPosition: 1 })
        castilingSquare2 = this.square.chessboard.getSquareFromPosition({ xPosition: 4, yPosition: 1 })
        if (castilingSquare1 !== undefined && castilingSquare2 !== undefined) {
          shortCastlingSquares.push(castilingSquare1)
          shortCastlingSquares.push(castilingSquare2)
        }
      } else {
        castilingSquare1 = this.square.chessboard.getSquareFromPosition({ xPosition: 3, yPosition: 8 })
        castilingSquare2 = this.square.chessboard.getSquareFromPosition({ xPosition: 4, yPosition: 8 })
        if (castilingSquare1 !== undefined && castilingSquare2 !== undefined) {
          shortCastlingSquares.push(castilingSquare1)
          shortCastlingSquares.push(castilingSquare2)
        }
      }
    }

    return shortCastlingSquares
  }

  private isFirstMoveRookInShortCastling (): boolean {
    const whiteRookPosition: SquarePosition = {
      xPosition: 8,
      yPosition: 1
    }
    const blackRookPosition: SquarePosition = {
      xPosition: 8,
      yPosition: 8
    }
    let rookSquare: SquareModelType | undefined
    let isRookFirstMove = false

    if (this.square !== undefined) {
      if (this.isWhite) {
        rookSquare = this.square.chessboard.getSquareFromPosition(whiteRookPosition)
        if (rookSquare?.piece instanceof RookModel) {
          if (rookSquare.piece.isFirstMove) {
            isRookFirstMove = true
          }
        }
      } else {
        rookSquare = this.square.chessboard.getSquareFromPosition(blackRookPosition)
        if (rookSquare?.piece instanceof RookModel) {
          if (rookSquare.piece.isFirstMove) {
            isRookFirstMove = true
          }
        }
      }
    }

    return isRookFirstMove
  }

  private isFirstMoveRookInLongCastling (): boolean {
    const whiteRookPosition: SquarePosition = {
      xPosition: 1,
      yPosition: 1
    }
    const blackRookPosition: SquarePosition = {
      xPosition: 1,
      yPosition: 8
    }
    let rookSquare: SquareModelType | undefined
    let isRookFirstMove = false

    if (this.square !== undefined) {
      if (this.isWhite) {
        rookSquare = this.square.chessboard.getSquareFromPosition(whiteRookPosition)
        if (rookSquare?.piece instanceof RookModel) {
          if (rookSquare.piece.isFirstMove) {
            isRookFirstMove = true
          }
        }
      } else {
        rookSquare = this.square.chessboard.getSquareFromPosition(blackRookPosition)
        if (rookSquare?.piece instanceof RookModel) {
          if (rookSquare.piece.isFirstMove) {
            isRookFirstMove = true
          }
        }
      }
    }

    return isRookFirstMove
  }

  private isFreeWayInShortCastling (): boolean {
    let isFreeWay = false
    let piece1: PieceModelType | undefined
    let piece2: PieceModelType | undefined

    if (this.square !== undefined) {
      if (this.isWhite) {
        piece1 = this.square.chessboard.getSquareFromPosition({ xPosition: 6, yPosition: 1 })?.piece
        piece2 = this.square.chessboard.getSquareFromPosition({ xPosition: 7, yPosition: 1 })?.piece
      } else {
        piece1 = this.square.chessboard.getSquareFromPosition({ xPosition: 6, yPosition: 8 })?.piece
        piece2 = this.square.chessboard.getSquareFromPosition({ xPosition: 7, yPosition: 8 })?.piece
      }

      if (piece1 === undefined && piece2 === undefined) {
        isFreeWay = true
      }
    }

    return isFreeWay
  }

  private isFreeWayInLongCastling (): boolean {
    let isFreeWay = false
    let piece1: PieceModelType | undefined
    let piece2: PieceModelType | undefined
    let piece3: PieceModelType | undefined

    if (this.square !== undefined) {
      if (this.isWhite) {
        piece1 = this.square.chessboard.getSquareFromPosition({ xPosition: 2, yPosition: 1 })?.piece
        piece2 = this.square.chessboard.getSquareFromPosition({ xPosition: 3, yPosition: 1 })?.piece
        piece3 = this.square.chessboard.getSquareFromPosition({ xPosition: 4, yPosition: 1 })?.piece
      } else {
        piece1 = this.square.chessboard.getSquareFromPosition({ xPosition: 2, yPosition: 8 })?.piece
        piece2 = this.square.chessboard.getSquareFromPosition({ xPosition: 3, yPosition: 8 })?.piece
        piece3 = this.square.chessboard.getSquareFromPosition({ xPosition: 4, yPosition: 8 })?.piece
      }

      if (piece1 === undefined && piece2 === undefined && piece3 === undefined) {
        isFreeWay = true
      }
    }

    return isFreeWay
  }

  private isCheckInShortCastlingMove (): boolean {
    let isCheck = false
    let square1: SquareModelType | undefined
    let square2: SquareModelType | undefined

    if (this.square !== undefined) {
      if (this.isWhite) {
        square1 = this.square.chessboard.getSquareFromPosition({ xPosition: 6, yPosition: 1 })
        square2 = this.square.chessboard.getSquareFromPosition({ xPosition: 7, yPosition: 1 })
      } else {
        square1 = this.square.chessboard.getSquareFromPosition({ xPosition: 6, yPosition: 8 })
        square2 = this.square.chessboard.getSquareFromPosition({ xPosition: 7, yPosition: 8 })
      }

      if (square1 !== undefined && square2 !== undefined) {
        isCheck = isCheckInSquare(square1, this.isWhite) || isCheckInSquare(square2, this.isWhite)
      }
    }

    return isCheck
  }

  private isCheckInLongCastlingMove (): boolean {
    let isCheck = false
    let square1: SquareModelType | undefined
    let square2: SquareModelType | undefined

    if (this.square !== undefined) {
      if (this.isWhite) {
        square1 = this.square.chessboard.getSquareFromPosition({ xPosition: 3, yPosition: 1 })
        square2 = this.square.chessboard.getSquareFromPosition({ xPosition: 4, yPosition: 1 })
      } else {
        square1 = this.square.chessboard.getSquareFromPosition({ xPosition: 3, yPosition: 8 })
        square2 = this.square.chessboard.getSquareFromPosition({ xPosition: 4, yPosition: 8 })
      }

      if (square1 !== undefined && square2 !== undefined) {
        isCheck = isCheckInSquare(square1, this.isWhite) || isCheckInSquare(square2, this.isWhite)
      }
    }

    return isCheck
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let possibleNextSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const pieceSquare = this.square

      possibleNextSquares = [
        ...getKingNextPossibleMoves(pieceSquare)
      ]

      if (this.isShortCastling()) {
        possibleNextSquares = [...possibleNextSquares, ...this.getShortCastlingSquares()]
      }

      if (this.isLongCastling()) {
        possibleNextSquares = [...possibleNextSquares, ...this.getLongCastlingSquares()]
      }
    }

    this.possibleNextSquares = possibleNextSquares

    return possibleNextSquares
  }
}
