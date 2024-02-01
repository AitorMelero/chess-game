import { useSquarePositions } from '../hooks/useSquarePositions'
import { Square } from './Square'

export const ChessBoard: React.FC = () => {
  const { squarePositions } = useSquarePositions()

  return (
    <div className='grid grid-cols-8 w-[45vw] h-[45vw]'>
      {
        squarePositions.map(({ xPosition, yPosition }) => (
          <Square key={xPosition.toString() + yPosition.toString()} xPosition={xPosition} yPosition={yPosition} />
        ))
      }
    </div>
  )
}
