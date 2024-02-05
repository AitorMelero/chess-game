import { useEffect, useState } from 'react'
import { useChessBoard } from '../hooks/useChessBoard'
import { type SquareProps, type PositionCoordinate } from '../types/Square'
import { Square } from './Square'

export const ChessBoard: React.FC = () => {
  const { isPositionSelected, getPieceFromInitPosition } = useChessBoard()
  const [squares, setSquares] = useState<JSX.Element[]>([])
  const [selectedSquares, setSelectedSquares] = useState<PositionCoordinate[]>([])
  const [nextPossibleSquares, setNextPossibleSquares] = useState<PositionCoordinate[]>([])

  useEffect(() => {
    setSquares(updateSquares())
  }, [])

  const updateSquares: ChessBoardType['updateSquares'] = () => {
    const squareElements: JSX.Element[] = []

    for (let y = 8; y > 0; y--) {
      for (let x = 1; x <= 8; x++) {
        const isSelected = isPositionSelected(x, y, selectedSquares)
        const piece = getPieceFromInitPosition(x, y)
        const square = (
          <Square
            key={x + '-' + y}
            xPosition={x}
            yPosition={y}
            piece={piece}
            isSelected={isSelected}
            isPossibleMove={false}
            paintNextPossibleSquares={paintNextPossibleSquares}
          />
        )
        squareElements.push(square)
      }
    }

    return squareElements
  }

  const paintNextPossibleSquares: SquareProps['paintNextPossibleSquares'] = (currentXPosition, currentYPosition) => {
    const currentPosition: PositionCoordinate = {
      xPosition: currentXPosition,
      yPosition: currentYPosition
    }
    const possibleMovesCoordinate: PositionCoordinate[] = [
      {
        xPosition: currentXPosition,
        yPosition: currentYPosition + 1
      }
    ]

    setSelectedSquares([currentPosition])
    setNextPossibleSquares(possibleMovesCoordinate)
    setSquares(updateSquares())
  }

  return (
    <div className="grid grid-cols-8 w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vw] xl:w-[45vw] xl:h-[45vw] min-w-80 min-h-80">
      {squares}
    </div>
  )
}
