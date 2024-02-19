import { BishopModel, KnightModel, PawnModel, QueenModel, RookModel } from '.'
import { type PlayType, type GameHistoryModelType } from '../types/GameHistory'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class GameHistoryModel implements GameHistoryModelType {
  readonly #chessboardHistory: PlayType[]
  readonly #playsHistory: string[]

  constructor () {
    this.#chessboardHistory = []
    this.#playsHistory = []
  }

  get chessboardHistory (): PlayType[] {
    return this.#chessboardHistory
  }

  get playsHistory (): string[] {
    return this.#playsHistory
  }

  private writePlay (newSquare: SquareModelType, piece: PieceModelType): void {
    const squarePosition = String.fromCharCode(newSquare.xPosition + 96) + newSquare.yPosition
    let playString: string
    if (piece instanceof PawnModel) {
      playString = squarePosition
    } else if (piece instanceof RookModel) {
      playString = 'R' + squarePosition
    } else if (piece instanceof KnightModel) {
      playString = 'N' + squarePosition
    } else if (piece instanceof BishopModel) {
      playString = 'B' + squarePosition
    } else if (piece instanceof QueenModel) {
      playString = 'Q' + squarePosition
    } else {
      playString = 'K' + squarePosition
    }

    this.playsHistory.push(playString)
  }

  addPlay (oldSquare: SquareModelType, newSquare: SquareModelType, piece: PieceModelType): void {
    console.log('Add Play: ', oldSquare, newSquare, piece)
    const newPlay: PlayType = {
      oldSquare,
      newSquare,
      piece
    }
    this.chessboardHistory.push(newPlay)
    this.writePlay(newSquare, piece)
  }

  goPlay (indexPlay: number): void {
    console.log('Go Play: ', indexPlay)
  }

  goPreviousPlay (): void {
    console.log('Go Previous Play')
  }

  goNextPlay (): void {
    console.log('Go Next Play')
  }
}
