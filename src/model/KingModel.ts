import { getKingNextPossibleMoves } from '../helpers'
import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class KingModel extends PieceModel {
  #isFirstMove: boolean

  constructor (isWhite: boolean) {
    const whiteKingImage = './src/assets/Pieces/wk.png'
    const blackKingImage = './src/assets/Pieces/bk.png'
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
    return false
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

  private isLongCastling (): boolean {
    return false
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      const pieceSquare = this.square

      nextPossibleSquares = [
        ...getKingNextPossibleMoves(pieceSquare)
      ]
    }

    return nextPossibleSquares
  }

  isInCheck (): boolean {
    let isCheck = false

    if (this.square !== undefined) {
      isCheck = this.square.chessboard.pieces.filter(
        piece => !(piece instanceof KingModel) && piece.calculatePossibleNextSquares().find(
          square => square === this.square
        )
      ).length > 0
    }

    console.log(isCheck)

    return isCheck
  }
}
