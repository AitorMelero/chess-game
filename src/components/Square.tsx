interface Props {
  isWhite: boolean
}

export const Square: React.FC<Props> = ({ isWhite }) => {
  const bgColor = `${isWhite ? 'bg-light-square' : 'bg-dark-square'}`

  return (
    <div className={bgColor}>
      Square
    </div>
  )
}
