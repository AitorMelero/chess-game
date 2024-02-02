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
    const nextSquareButtonElement = document.getElementById(
      `button-square-${xPosition}-${yPosition + 1}`
    )
    const moveAction = () => { movePiece(xPosition, yPosition, xPosition, yPosition + 1) }

    if (possibleMoveElement !== null && selectedSquareElement !== null && nextSquareButtonElement !== null) {
      if (isSelected) {
        possibleMoveElement.className = 'not-possible-move-square'
        selectedSquareElement.className = 'not-selected-square'
        nextSquareButtonElement.removeEventListener('click', moveAction, true)
      } else {
        possibleMoveElement.className = 'possible-move-square'
        selectedSquareElement.className = 'selected-square'
        nextSquareButtonElement.addEventListener('click', moveAction, true)
      }

      // setXPosition(xPosition)
      // setYPosition(yPosition)

      setIsSelected(!isSelected)
    }
  }

  const movePiece = (
    currentXPosition: number,
    currentYPosition: number,
    newXPosition: number,
    newYPosition: number
  ): void => {
    const currentSquareElement = document.getElementById(
      `selected-square-${currentXPosition}-${currentYPosition}`
    )
    const nextSquareElement = document.getElementById(
      `selected-square-${newXPosition}-${newYPosition}`
    )

    if (currentSquareElement !== null && nextSquareElement !== null) {
      // const currentPieceElement = currentSquareElement.childNodes[1]
      const currentPieceElement = currentSquareElement.lastChild
      // currentSquareElement.removeChild(currentSquareElement.childNodes[1])
      if (currentPieceElement !== null) {
        currentSquareElement.removeChild(currentPieceElement)
        nextSquareElement.appendChild(currentPieceElement)
      }
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
