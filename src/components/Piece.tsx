interface Props {
  pieceSVG: string
}

export const Piece: React.FC<Props> = ({ pieceSVG }) => {
  return (
    <button
      className='absolute w-full h-full flex justify-center items-center'
      onClick={() => { console.log('Click the piece!') }}
    >
      <img src={pieceSVG} className='w-[85%] h-[85%]' alt="Chess Piece" />
    </button>
  )
}
