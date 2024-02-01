import { useSquare } from '../hooks/useSquare'

interface Props {
  xPosition: number
  yPosition: number
}

export const Square: React.FC<Props> = ({ xPosition, yPosition }) => {
  const { bgColor, coordinateColor, numberPosition, letterPosition } = useSquare({ xPosition, yPosition })
  const isSelected = false
  const isPossibleMove = false
  const bgSelectedColor = `bg-selected-square ${isSelected ? 'bg-opacity-60' : 'bg-opacity-0'}`
  const bgPossibleMoveColor = `bg-black ${isPossibleMove ? 'bg-opacity-20' : 'bg-opacity-0'}`

  return (
    <div className={bgColor + ' relative font-semibold text-[8px] sm:text-sm lg:text-lg xl:text-xl'}>
      <p className={coordinateColor + ' absolute top-1 left-2'}>
        {numberPosition}
      </p>
      <p className={coordinateColor + ' absolute bottom-1 right-2'}>
        {letterPosition}
      </p>
      <div className={bgSelectedColor + ' w-full h-full flex justify-center items-center'}>
        <div className={bgPossibleMoveColor + ' w-1/4 h-1/4 rounded-full'} />
      </div>
    </div>
  )
}
