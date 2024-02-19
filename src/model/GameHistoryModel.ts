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

    this.paintPlayString(playString)
  }

  private paintPlayString (playString: string): void {
    const playHistoryElement = document.getElementById('play-history')
    const currentTurn = Math.round(this.playsHistory.length / 2)
    const currentTurnId = `play-history-${currentTurn}`
    let playHistoryTurnElement = document.getElementById(currentTurnId)

    if (playHistoryElement !== null) {
      if (playHistoryTurnElement === null) {
        // Create article turn play element
        playHistoryTurnElement = document.createElement('article')
        playHistoryTurnElement.id = currentTurnId
        playHistoryTurnElement.className = 'grid grid-flow-row grid-cols-3'

        // Create paragraph turn play element
        const paragraphElement = document.createElement('p')
        paragraphElement.className = 'h-20 text-center pt-[35%]'
        paragraphElement.innerHTML = currentTurn + '.'
        playHistoryTurnElement.appendChild(paragraphElement)
        playHistoryElement.appendChild(playHistoryTurnElement)
      }

      // Add button play element
      const playButton = document.createElement('button')
      playButton.className = 'h-20 bg-slate-600'
      playButton.innerHTML = playString
      playHistoryTurnElement.appendChild(playButton)
    }
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
