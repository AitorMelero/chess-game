import { useState } from 'react'

interface Props {
  isWhite: boolean
}

export const Square: React.FC<Props> = ({ isWhite }) => {
  const [isSelected, setIsSelected] = useState(false)
  const bgColor = `${isWhite ? 'bg-light-square' : 'bg-dark-square'}`
  const bgSelectedColor = `bg-selected-square ${isSelected ? 'bg-opacity-60' : 'bg-opacity-0'}`

  return (
    <div className={bgColor}>
      <div className={bgSelectedColor}>
        Square
      </div>
    </div>
  )
}
