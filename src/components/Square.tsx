import { useEffect, useState } from 'react'

interface Props {
  xPosition: number
  yPosition: number
}

export const Square: React.FC<Props> = ({ xPosition, yPosition }) => {
  const [bgColor, setBgColor] = useState('bg-light-square')
  const [coordinateColor, setCoordinateColor] = useState('text-dark-square')
  const [number, setNumber] = useState('')
  const [letter, setLetter] = useState('')
  const isSelected = false
  const isPossibleMove = false
  const bgSelectedColor = `bg-selected-square ${isSelected ? 'bg-opacity-60' : 'bg-opacity-0'}`
  const bgPossibleMoveColor = `bg-black ${isPossibleMove ? 'bg-opacity-20' : 'bg-opacity-0'}`
  const sizeDelete = ' w-24 h-24'

  useEffect(() => {
    const hasNumberCoordinate = xPosition === 1
    const hasLetterCoordinate = yPosition === 1
    const isBlack = (xPosition + yPosition) % 2 === 0

    if (isBlack) {
      setBgColor('bg-dark-square')
      setCoordinateColor('text-light-square')
    }

    if (hasNumberCoordinate) {
      setNumber(yPosition.toString())
    }

    if (hasLetterCoordinate) {
      setLetter(String.fromCharCode(xPosition + 96))
    }
  }, [])

  return (
    <div className={bgColor + sizeDelete + ' relative'}>
      <p className={coordinateColor + ' absolute top-1 left-2 font-semibold text-xl'}>
        {number}
      </p>
      <p className={coordinateColor + ' absolute bottom-1 right-2 font-semibold text-xl'}>
        {letter}
      </p>
      <div className={bgSelectedColor + ' w-full h-full flex justify-center items-center'}>
        <div className={bgPossibleMoveColor + ' w-1/4 h-1/4 rounded-full'} />
      </div>
    </div>
  )
}
