import { useState } from 'react'
import { useSquare } from '../hooks/useSquare'
import { type SquareProps } from '../types/Square'

export const Square: React.FC<SquareProps> = ({
  xPosition,
  yPosition,
  piece,
  isSelected: selected,
  isPossibleMove: possibleMove,
  paintNextPossibleSquares
}) => {
  const { bgColor, coordinateColor, numberPosition, letterPosition } = useSquare({ xPosition, yPosition })
  const [isDisabled, setIsDisabled] = useState(piece === undefined)
  const [isSelected, setIsSelected] = useState(selected)
  const [isPossibleMove, setIsPossibleMove] = useState(possibleMove)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    paintNextPossibleSquares(xPosition, yPosition)
    setIsSelected(!isSelected)
  }

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={bgColor + ' relative font-semibold text-[8px] sm:text-sm lg:text-lg xl:text-xl'}
    >
      <p className={coordinateColor + ' absolute top-1 left-2'}>
        {numberPosition}
      </p>
      <p className={coordinateColor + ' absolute bottom-1 right-2'}>
        {letterPosition}
      </p>
      <div className={`${isSelected ? 'selected-square' : 'not-selected-square'}`}>
        <div className={`${isPossibleMove ? 'possible-move-square' : 'not-possible-move-square'}`} />
        {piece}
      </div>
    </button>
  )
}
