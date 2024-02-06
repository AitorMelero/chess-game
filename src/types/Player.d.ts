import { type PieceModelType } from './Piece'

export interface PlayerModelType {
  get isWhite(): boolean
  get pieces (): PieceModelType[]
  set pieces (pieces: PieceModelType[]): void
}
