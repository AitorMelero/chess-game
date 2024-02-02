import { useState } from 'react'

interface Props {
  pieceSVG: string
  initXPosition: number
  initYPosition: number
}

export const Piece: React.FC<Props> = ({
  pieceSVG,
  initXPosition,
  initYPosition
}) => {
  const [xPosition, setXPosition] = useState(initXPosition)
  const [yPosition, setYPosition] = useState(initYPosition)
  const [isSelected, setIsSelected] = useState(false)

  const selectPossiblesMoves = (): void => {
    const possibleMoveElementId = `possible-move-square-${xPosition}-${yPosition + 1}`

    const possibleMoveElement = document.getElementById(possibleMoveElementId)
    if (possibleMoveElement !== null) {
      if (isSelected) {
        possibleMoveElement.className = 'not-possible-move-square'
      } else {
        possibleMoveElement.className = 'possible-move-square'
      }

      setIsSelected(!isSelected)
    }

    console.log('Select Possibles Moves')
  }

  return (
    <button
      className="absolute w-full h-full flex justify-center items-center"
      onClick={selectPossiblesMoves}
    >
      <img src={pieceSVG} className="w-[85%] h-[85%]" alt="Chess Piece" />
    </button>
  )
}
