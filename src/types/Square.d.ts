export interface PositionCoordinate {
  xPosition: number
  yPosition: number
}

interface SquareProps {
  xPosition: number
  yPosition: number
  piece?: JSX.Element
  isSelected: boolean
  isPossibleMove: boolean
  paintNextPossibleSquares: (currentXPosition: number, currentYPosition: number) => void
}
