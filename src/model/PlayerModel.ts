import { type PieceModelType } from '../types/Piece'
import { type PlayerModelType } from '../types/Player'

export class PlayerModel implements PlayerModelType {
  readonly #isWhite: boolean
  #pieces: PieceModelType[]

  constructor (isWhite: boolean) {
    this.#isWhite = isWhite
    this.#pieces = []
  }

  get isWhite (): boolean {
    return this.#isWhite
  }

  get pieces (): PieceModelType[] {
    return this.#pieces
  }

  set pieces (pieces: PieceModelType[]) {
    this.#pieces = pieces
  }
}
