import { type GameHistoryModelType, type ChessboardHistoryType } from '../types/GameHistory'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class GameHistoryModel implements GameHistoryModelType {
  readonly #chessboardHistory: ChessboardHistoryType[]
  readonly #playsHistory: string[]

  constructor () {
    this.#chessboardHistory = []
    this.#playsHistory = []
  }

  get chessboardHistory (): ChessboardHistoryType[] {
    return this.#chessboardHistory
  }

  get playsHistory (): string[] {
    return this.#playsHistory
  }

  addPlay (oldSquare: SquareModelType, newSquare: SquareModelType, piece: PieceModelType): void {
    console.log('Add Play: ', oldSquare, newSquare, piece)
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
