import { useSquare } from '../hooks/useSquare'
import { type SquareProps } from '../types/Square'

export const Square: React.FC<SquareProps> = ({ squareModel }) => {
  const { bgColor, coordinateColor, numberPosition, letterPosition } = useSquare(squareModel.xPosition, squareModel.yPosition)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  return (
    <button
      id={squareModel.squareIdElement}
      disabled={squareModel.piece === undefined}
      onClick={handleClick}
      className={bgColor + ' relative font-semibold text-[8px] sm:text-sm lg:text-lg xl:text-xl'}
    >
      <p className={coordinateColor + ' absolute top-1 left-2'}>
        {numberPosition}
      </p>
      <p className={coordinateColor + ' absolute bottom-1 right-2'}>
        {letterPosition}
      </p>
      <div
        id={squareModel.squareSelectedIdElement}
        className={'not-selected-square'}
      >
        <div
          id={squareModel.squarePossibleMoveIdElement}
          className={'not-possible-move-square'}
        />
        <div
          id={`square-piece-${squareModel.xPosition}-${squareModel.yPosition}`}
          className="absolute w-full h-full flex justify-center items-center"
        />
      </div>
    </button>
  )
}
