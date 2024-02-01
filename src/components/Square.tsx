interface Props {
  xPosition: number
  yPosition: number
  isWhite: boolean
}

export const Square: React.FC<Props> = ({ xPosition, yPosition, isWhite }) => {
  const isSelected = false
  const isPossibleMove = true
  const bgColor = `${isWhite ? 'bg-light-square' : 'bg-dark-square'}`
  const bgSelectedColor = `bg-selected-square ${isSelected ? 'bg-opacity-60' : 'bg-opacity-0'}`
  const bgPossibleMoveColor = `bg-black ${isPossibleMove ? 'bg-opacity-20' : 'bg-opacity-0'}`
  const sizeDelete = ' w-24 h-24'

  return (
    <div className={bgColor + sizeDelete}>
      <div className={bgSelectedColor + ' w-full h-full flex justify-center items-center'}>
        <div className={bgPossibleMoveColor + ' w-1/4 h-1/4 rounded-full'}>
        </div>
      </div>
    </div>
  )
}
