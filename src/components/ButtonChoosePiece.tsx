interface Props {
  image: string
}

export const ButtonChoosePiece: React.FC<Props> = ({ image }) => {
  return (
    <button className='bg-dark-square border-2 border-white w-[20%]' >
      <img src={image} alt="Chess Piece" />
    </button>
  )
}
