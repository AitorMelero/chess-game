import { type AppModelType } from '../types/App'
import { type ChessboardModelType } from '../types/Chessboard'
import { ChessboardModel } from './ChessboardModel'

export class AppModel implements AppModelType {
  readonly #chessboard: ChessboardModelType

  constructor () {
    this.#chessboard = new ChessboardModel()
  }

  get chessboard (): ChessboardModelType {
    return this.#chessboard
  }
}
