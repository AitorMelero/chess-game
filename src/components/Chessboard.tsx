import { useEffect, useState } from 'react'
import { type ChessboardProps } from '../types/Chessboard'
import { Square } from './Square'
import { PopupChoosePiece } from './PopupChoosePiece'

export const Chessboard: React.FC<ChessboardProps> = ({ chessboardModel }) => {
  const [squares, setSquares] = useState<JSX.Element[]>([])
  const [isLoadingBoard, setIsLoadingBoard] = useState(true)
  const [isChooseWhitePiece] = useState(false)
  const [isChooseBlackPiece] = useState(false)

  // Load and paint the squares
  useEffect(() => {
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

  return (
    <div className="grid grid-cols-8 w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vw] xl:w-[45vw] xl:h-[45vw] min-w-80 min-h-80">
      {squares}
      {isChooseWhitePiece && <PopupChoosePiece isWhite={true}/>}
      {isChooseBlackPiece && <PopupChoosePiece isWhite={false} />}
    </div>
  )
}
