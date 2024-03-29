import { useEffect, useState } from 'react'
import { type ChessboardProps } from '../types/Chessboard'
import { Square } from './Square'
import { type NewChoosePiece } from '../types/Piece'
import { PopupChess } from './PopupChess'

export const Chessboard: React.FC<ChessboardProps> = ({ chessboardModel }) => {
  const [squares, setSquares] = useState<JSX.Element[]>([])
  const [isLoadingBoard, setIsLoadingBoard] = useState(true)

  // Load and paint the squares
  useEffect(() => {
    const popupElement = document.getElementById('popup-root') as HTMLDivElement
    if (popupElement !== null) {
      popupElement.hidden = true
    }

    setSquares(chessboardModel.squares.map(square => {
      const returnedSquare = <Square key={square.squareIdElement} squareModel={square} />
      return returnedSquare
    }))
    setIsLoadingBoard(false)
  }, [])

  // Paint the pieces
  useEffect(() => {
    chessboardModel.createPieces()
  }, [isLoadingBoard])

  const changePawn = (newTypePiece: NewChoosePiece): void => {
    chessboardModel.changePawn(newTypePiece)
  }

  const restartGame = (): void => {
    chessboardModel.restartGame()
  }

  return (
    <div className="chessboard">
      {squares}
      <PopupChess isLoading={isLoadingBoard} onChoosePiece={changePawn} onRestartGame={restartGame} />
    </div>
  )
}
