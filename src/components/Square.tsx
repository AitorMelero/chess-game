import { useState } from 'react'
import { useSquare } from '../hooks/useSquare'

interface Props {
  xPosition: number
  yPosition: number
  piece?: JSX.Element
}

export const Square: React.FC<Props> = ({ xPosition, yPosition, piece }) => {
  const { bgColor, coordinateColor, numberPosition, letterPosition } = useSquare({ xPosition, yPosition })
  const [isDisabled, setIsDisabled] = useState(piece === undefined)

  return (
    <button disabled={isDisabled} id={`square-${xPosition}-${yPosition}`} className={bgColor + ' relative font-semibold text-[8px] sm:text-sm lg:text-lg xl:text-xl'}>
      <p className={coordinateColor + ' absolute top-1 left-2'}>
        {numberPosition}
      </p>
      <p className={coordinateColor + ' absolute bottom-1 right-2'}>
        {letterPosition}
      </p>
      <div id={`selected-square-${xPosition}-${yPosition}`} className={'not-selected-square'}>
        <div id={`button-square-${xPosition}-${yPosition}`} className={'not-selected-square'}>
          <div id={`possible-move-square-${xPosition}-${yPosition}`} className={'not-possible-move-square'} />
        </div>
        {piece}
      </div>
    </button>
  )
}
