import { BishopModel, KnightModel, PawnModel, QueenModel, RookModel } from '.'
import { type PossibleEnPassant, type ChessboardModelType } from '../types/Chessboard'
import { type PlayType, type GameHistoryModelType } from '../types/GameHistory'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export class GameHistoryModel implements GameHistoryModelType {
  #chessboardHistory: PlayType[]
  #playsHistory: string[]
  #currentPlayIndex: number

  constructor () {
    this.#chessboardHistory = []
    this.#playsHistory = []
    this.#currentPlayIndex = -1
  }

  get chessboardHistory (): PlayType[] {
    return this.#chessboardHistory
  }

  get playsHistory (): string[] {
    return this.#playsHistory
  }

  get currentPlayIndex (): number {
    return this.#currentPlayIndex
  }

  private writePlay (
    oldSquare: SquareModelType,
    newSquare: SquareModelType,
    piece: PieceModelType,
    isEatPiece: boolean,
    isCheck: boolean,
    isCheckmate: boolean,
    isCastling: boolean,
    isHorizontalAmbiguity: boolean,
    isVerticalAmbiguity: boolean
  ): void {
    const newSquarePosition = String.fromCharCode(newSquare.xPosition + 96) + newSquare.yPosition
    const ambiguityNotation = isHorizontalAmbiguity
      ? String.fromCharCode(oldSquare.xPosition + 96)
      : isVerticalAmbiguity ? oldSquare.yPosition : ''
    let playString: string

    if (piece instanceof PawnModel) {
      if (isEatPiece) {
        playString = String.fromCharCode(oldSquare.xPosition + 96) + 'x' + newSquarePosition
      } else {
        playString = newSquarePosition
      }
    } else if (piece instanceof RookModel) {
      playString = 'R' + ambiguityNotation + `${isEatPiece ? 'x' : ''}` + newSquarePosition
    } else if (piece instanceof KnightModel) {
      playString = 'N' + ambiguityNotation + `${isEatPiece ? 'x' : ''}` + newSquarePosition
    } else if (piece instanceof BishopModel) {
      playString = 'B' + ambiguityNotation + `${isEatPiece ? 'x' : ''}` + newSquarePosition
    } else if (piece instanceof QueenModel) {
      playString = 'Q' + ambiguityNotation + `${isEatPiece ? 'x' : ''}` + newSquarePosition
    } else if (isCastling) {
      if (newSquare.xPosition === 7) {
        playString = '0-0'
      } else {
        playString = '0-0-0'
      }
    } else {
      playString = 'K' + `${isEatPiece ? 'x' : ''}` + newSquarePosition
    }

    if (isCheckmate) {
      playString = playString + '#'
    } else if (isCheck) {
      playString = playString + '+'
    }

    this.playsHistory.push(playString)

    this.paintPlayString(playString, Math.round((this.currentPlayIndex + 1) / 2), oldSquare.chessboard, this.currentPlayIndex)
  }

  private paintPlayString (playString: string, currentTurn: number, chessboard: ChessboardModelType, playIndex: number): void {
    const playHistoryElement = document.getElementById('play-history')
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
      playButton.addEventListener('click', () => {
        this.goPlay(playIndex, chessboard)
      })
      playButton.innerHTML = playString
      playHistoryTurnElement.appendChild(playButton)
    }
  }

  private paintAllPlayString (chessboard: ChessboardModelType): void {
    const playHistoryElement = document.getElementById('play-history')

    if (playHistoryElement !== null) {
      playHistoryElement.innerHTML = ''
      this.playsHistory.forEach((play, index) => { this.paintPlayString(play, Math.round((index + 1) / 2), chessboard, index) })
    }
  }

  private getPossibleEnPassant (chessboard: ChessboardModelType): PossibleEnPassant | undefined {
    let possibleEnPassant: PossibleEnPassant | undefined

    if (this.currentPlayIndex > -1) {
      const { piece, oldSquare, newSquare } = this.chessboardHistory[this.currentPlayIndex]

      if (piece instanceof PawnModel) {
        if (oldSquare.yPosition + 2 === newSquare.yPosition) {
          possibleEnPassant = {
            pawn: piece,
            square: chessboard.getSquareFromPosition({
              xPosition: oldSquare.xPosition,
              yPosition: oldSquare.yPosition + 1
            })
          }
        } else if (oldSquare.yPosition - 2 === newSquare.yPosition) {
          possibleEnPassant = {
            pawn: piece,
            square: chessboard.getSquareFromPosition({
              xPosition: oldSquare.xPosition,
              yPosition: oldSquare.yPosition - 1
            })
          }
        }
      }
    }

    return possibleEnPassant
  }

  addPlay (
    oldSquare: SquareModelType,
    newSquare: SquareModelType,
    piece: PieceModelType,
    eatenPiece: PieceModelType | undefined,
    isEatEnPassant: boolean,
    isCheck: boolean,
    isCheckmate: boolean,
    isCastling: boolean,
    isHorizontalAmbiguity: boolean,
    isVerticalAmbiguity: boolean
  ): void {
    const newPlay: PlayType = {
      oldSquare,
      newSquare,
      piece,
      eatenPiece,
      isEatEnPassant
    }

    this.#currentPlayIndex = this.currentPlayIndex + 1
    this.playsHistory.length = this.currentPlayIndex
    this.chessboardHistory.length = this.currentPlayIndex
    this.paintAllPlayString(oldSquare.chessboard)
    this.chessboardHistory.push(newPlay)
    this.writePlay(
      oldSquare,
      newSquare,
      piece,
      eatenPiece !== undefined,
      isCheck,
      isCheckmate,
      isCastling,
      isHorizontalAmbiguity,
      isVerticalAmbiguity
    )
  }

  goPlay (indexPlay: number, chessboard: ChessboardModelType): void {
    const currentPlay = this.currentPlayIndex

    if (indexPlay < currentPlay) {
      for (let i = currentPlay; i > indexPlay; i--) {
        this.goPreviousPlay(chessboard)
      }
    } else if (indexPlay > currentPlay) {
      for (let i = currentPlay; i < indexPlay; i++) {
        this.goNextPlay(chessboard)
      }
    }
  }

  goPreviousPlay (chessboard: ChessboardModelType): void {
    if (this.currentPlayIndex > -1) {
      const currentPlay = this.chessboardHistory[this.currentPlayIndex]
      currentPlay.piece.unpaintInSquare()
      currentPlay.piece.paintInSquare(currentPlay.oldSquare)

      if (currentPlay.eatenPiece !== undefined) {
        if (currentPlay.isEatEnPassant) {
          const eatenPawnSquare = chessboard.getSquareFromPosition({
            xPosition: currentPlay.newSquare.xPosition,
            yPosition: chessboard.currentPlayer.isWhite
              ? currentPlay.newSquare.yPosition + 1
              : currentPlay.newSquare.yPosition - 1
          })
          if (eatenPawnSquare !== undefined) {
            chessboard.possibleEnPassant = {
              pawn: currentPlay.eatenPiece as PawnModel,
              square: currentPlay.newSquare
            }
            const previousPlay = this.chessboardHistory[this.currentPlayIndex - 1]
            previousPlay.piece.paintInSquare(previousPlay.newSquare)
          }
        } else {
          currentPlay.eatenPiece?.paintInSquare(currentPlay.newSquare)
        }
      }

      chessboard.squares.forEach(square => {
        square.unpaintSelected()
        square.unpaintPossibleMove()
      })

      this.#currentPlayIndex = this.currentPlayIndex - 1

      if (this.currentPlayIndex > -1) {
        const previousPlay = this.chessboardHistory[this.currentPlayIndex]
        previousPlay.newSquare.paintSelected()
      }

      chessboard.possibleEnPassant = this.getPossibleEnPassant(chessboard)

      const newCurrentPlayer = chessboard.players.find(player => player !== chessboard.currentPlayer)
      if (newCurrentPlayer !== undefined) {
        chessboard.currentPlayer = newCurrentPlayer
      }
    }
  }

  goNextPlay (chessboard: ChessboardModelType): void {
    if (this.currentPlayIndex + 1 < this.playsHistory.length) {
      this.#currentPlayIndex = this.currentPlayIndex + 1

      const currentPlay = this.chessboardHistory[this.currentPlayIndex]
      currentPlay.piece.unpaintInSquare()
      currentPlay.piece.paintInSquare(currentPlay.newSquare)

      if (currentPlay.eatenPiece !== undefined) {
        if (currentPlay.isEatEnPassant) {
          chessboard.possibleEnPassant?.pawn.unpaintInSquare()
          chessboard.possibleEnPassant = undefined
        }
        currentPlay.eatenPiece.unpaintInSquare()
      }

      chessboard.squares.forEach(square => {
        square.unpaintSelected()
        square.unpaintPossibleMove()
      })

      currentPlay.newSquare.paintSelected()

      chessboard.possibleEnPassant = this.getPossibleEnPassant(chessboard)

      const newCurrentPlayer = chessboard.players.find(player => player !== chessboard.currentPlayer)
      if (newCurrentPlayer !== undefined) {
        chessboard.currentPlayer = newCurrentPlayer
      }
    }
  }

  restart (): void {
    const playHistoryElement = document.getElementById('play-history')

    if (playHistoryElement !== null) {
      playHistoryElement.innerHTML = ''

      this.#chessboardHistory = []
      this.#playsHistory = []
      this.#currentPlayIndex = -1
    }
  }
}
