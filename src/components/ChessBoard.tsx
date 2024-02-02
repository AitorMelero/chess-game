import { useChessBoard } from '../hooks/useChessBoard'
import { Square } from './Square'

export const ChessBoard: React.FC = () => {
  const { squarePositions, getPieceFromInitPosition } = useChessBoard()

  return (
    <div className="grid grid-cols-8 w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vw] xl:w-[45vw] xl:h-[45vw] min-w-80 min-h-80">
      {squarePositions.map(({ xPosition, yPosition }) => (
        <Square
          key={xPosition.toString() + yPosition.toString()}
          xPosition={xPosition}
          yPosition={yPosition}
        >
          {getPieceFromInitPosition(xPosition, yPosition)}
        </Square>
      ))}
    </div>
  )
}
