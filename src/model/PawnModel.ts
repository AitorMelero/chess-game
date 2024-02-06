import { blackPawnImage, whitePawnImage } from '../assets/Pieces'
import { type PlayerModelType } from '../types/Player'
import { PieceModel } from './PieceModel'

export class PawnModel extends PieceModel {
  constructor (player: PlayerModelType) {
    const image = player.isWhite ? whitePawnImage : blackPawnImage
    super(image, player)
  }
}
