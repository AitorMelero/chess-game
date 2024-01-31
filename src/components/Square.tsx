import { useState } from 'react'

interface Props {
  isWhite: boolean
}

export const Square: React.FC<Props> = ({ isWhite }) => {
  const [isSelected, setIsSelected] = useState(false)
  const bgColor = `${isWhite ? 'bg-light-square' : 'bg-dark-square'}`
  const bgSelectedColor = `bg-selected-square ${isSelected ? 'bg-opacity-60' : 'bg-opacity-0'}`
  const sizeDelete = ' w-24 h-24'

  return (
    <div className={bgColor + sizeDelete}>
      <div className={bgSelectedColor}>
      </div>
    </div>
  )
}
