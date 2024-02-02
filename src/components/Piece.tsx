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
    const possibleMoveElement = document.getElementById(
      `possible-move-square-${xPosition}-${yPosition + 1}`
    )
    const selectedSquareElement = document.getElementById(
      `selected-square-${xPosition}-${yPosition}`
    )

    if (possibleMoveElement !== null && selectedSquareElement !== null) {
      if (isSelected) {
        possibleMoveElement.className = 'not-possible-move-square'
        selectedSquareElement.className = 'not-selected-square'
      } else {
        possibleMoveElement.className = 'possible-move-square'
        selectedSquareElement.className = 'selected-square'
      }

      setIsSelected(!isSelected)
    }
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
