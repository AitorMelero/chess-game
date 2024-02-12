import { type SquareModelType } from '../types/Square'
import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (isWhite: boolean) {
    const whitePawnImage = './src/assets/Pieces/wp.png'
    const blackPawnImage = './src/assets/Pieces/bp.png'
    const image = isWhite ? whitePawnImage : blackPawnImage
    super(image, isWhite)
  }

  private isSquareInPossibleMove (square: SquareModelType): boolean {
    const isFirstMove = this.isWhite ? this.square?.yPosition === 2 : this.square?.yPosition === 7
    const nextYPossibleMove = this.calculateNextYPossibleMoves(isFirstMove)

    return nextYPossibleMove.find(
      yPosition => yPosition === square.yPosition &&
      this.square?.xPosition === square.xPosition
    ) !== undefined
  }

  private calculateNextYPossibleMoves (isFirstMove: boolean): number[] {
    const yPositions: number[] = []

    if (this.square !== undefined) {
      const possibleXPosition = this.square.xPosition
      let possibleYPosition: number
      let possibleSquare: SquareModelType | undefined

      if (this.isWhite) {
        possibleYPosition = this.square.yPosition + 1
        yPositions.push(possibleYPosition)
        possibleSquare = this.square.chessboard.getSquareFromPosition({
          xPosition: possibleXPosition,
          yPosition: possibleYPosition
        })
        if (isFirstMove && possibleSquare?.piece === undefined) {
          yPositions.push(this.square.yPosition + 2)
        }
      } else {
        possibleYPosition = this.square.yPosition - 1
        yPositions.push(possibleYPosition)
        possibleSquare = this.square.chessboard.getSquareFromPosition({
          xPosition: possibleXPosition,
          yPosition: possibleYPosition
        })
        if (isFirstMove && possibleSquare?.piece === undefined) {
          yPositions.push(this.square.yPosition - 2)
        }
      }
    }

    return yPositions
  }

  private canEatPiece (squareTarget: SquareModelType): boolean {
    let pawnCanEat = false

    if (squareTarget.piece?.isWhite !== this.isWhite && this.square !== undefined) {
      if (this.isWhite) {
        if (squareTarget.yPosition === this.square.yPosition + 1) {
          if (squareTarget.xPosition === this.square.xPosition - 1 || squareTarget.xPosition === this.square.xPosition + 1) {
            pawnCanEat = true
          }
        }
      } else {
        if (squareTarget.yPosition === this.square.yPosition - 1) {
          if (squareTarget.xPosition === this.square.xPosition - 1 || squareTarget.xPosition === this.square.xPosition + 1) {
            pawnCanEat = true
          }
        }
      }
    }

    return pawnCanEat
  }

  private canEatPawnEnPassant (squareTarget: SquareModelType): boolean {
    let canEat = false

    if (this.isWhite) {
      if (squareTarget.yPosition === 6 && this.square?.yPosition === 5 &&
        (this.square?.xPosition === squareTarget.xPosition - 1 ||
          this.square?.xPosition === squareTarget.xPosition + 1)
      ) {
        canEat = squareTarget === this.square?.chessboard.possibleEnPassant?.square
      }
    } else if (squareTarget.yPosition === 3 && this.square?.yPosition === 4 &&
        (this.square?.xPosition === squareTarget.xPosition - 1 ||
          this.square?.xPosition === squareTarget.xPosition + 1)
    ) {
      canEat = squareTarget === this.square?.chessboard.possibleEnPassant?.square
    }

    return canEat
  }

  calculatePossibleNextSquares (): SquareModelType[] {
    let nextPossibleSquares: SquareModelType[] = []

    if (this.square !== undefined) {
      nextPossibleSquares = this.square.chessboard.squares.filter(
        square =>
          (square.piece !== undefined && square.piece.isWhite !== this.isWhite && this.canEatPiece(square)) ||
          (square.piece === undefined && (this.isSquareInPossibleMove(square) || this.canEatPawnEnPassant(square)))
      )
    }

    return nextPossibleSquares
  }

  paintInSquare (square: SquareModelType): void {
    const isWhiteChange = square.yPosition === 8 && this.isWhite
    const isBlackChange = square.yPosition === 1 && !this.isWhite

    if (isWhiteChange || isBlackChange) {
      square.chessboard.showChangePawnModal(this)
    }

    super.paintInSquare(square)
  }
}
