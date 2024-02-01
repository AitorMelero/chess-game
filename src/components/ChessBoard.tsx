import { Square } from './Square'

interface squarePositions {
  xPosition: number
  yPosition: number
}

export const ChessBoard: React.FC = () => {
  const squarePositions: squarePositions[] = []

  for (let y = 8; y > 0; y--) {
    for (let x = 1; x <= 8; x++) {
      squarePositions.push({ xPosition: x, yPosition: y })
    }
  }

  return (
    <div className='grid grid-cols-8 w-1/2 h-[66vh]'>
      {
        squarePositions.map(({ xPosition, yPosition }) => (
          <Square key={xPosition + yPosition} xPosition={xPosition} yPosition={yPosition} />
        ))
      }
    </div>
  )
}
