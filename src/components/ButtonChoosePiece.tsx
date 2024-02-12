import { type NewChoosePiece } from '../types/Piece'

interface Props {
  id: string
  image: string
  onChoosePiece: (typePiece: NewChoosePiece) => void
}

export const ButtonChoosePiece: React.FC<Props> = ({ id, image, onChoosePiece }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()

    const typePiece: NewChoosePiece =
      id.includes('queen')
        ? 'Queen'
        : id.includes('bishop')
          ? 'Bishop'
          : id.includes('knight')
            ? 'Knight'
            : 'Rook'
    onChoosePiece(typePiece)
  }

  return (
    <button
      className='bg-dark-square border-2 border-white w-[20%]'
      onClick={handleClick}
    >
      <img id={id} src={image} alt="Chess Piece" />
    </button>
  )
}
