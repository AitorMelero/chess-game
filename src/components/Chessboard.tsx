import { useEffect, useState } from 'react'
import { type ChessboardProps } from '../types/Chessboard'
import { Square } from './Square'

export const Chessboard: React.FC<ChessboardProps> = ({ chessboardModel }) => {
  const [squares, setSquares] = useState<JSX.Element[]>([])

  useEffect(() => {
    setSquares(chessboardModel.squares.map(square => (
      <Square key={square.squareIdElement} squareModel={square}/>
    )))
  }, [])

  return (
    <div className="grid grid-cols-8 w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vw] xl:w-[45vw] xl:h-[45vw] min-w-80 min-h-80">
      {squares}
    </div>
  )
}
