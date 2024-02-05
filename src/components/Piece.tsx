import { type PieceProps } from '../types/Piece'

export const Piece: React.FC<PieceProps> = ({
  svgImage
}) => {
  return (
    <button
      className="absolute w-full h-full flex justify-center items-center"
    >
      <img src={svgImage} className="w-[85%] h-[85%]" alt="Chess Piece" />
    </button>
  )
}
