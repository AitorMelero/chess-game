import { ButtonChoosePiece } from './ButtonChoosePiece'
import { useState } from 'react'
import { type NewChoosePiece } from '../types/Piece'

interface Props {
  onChoosePiece: (newTypePiece: NewChoosePiece) => void
}

export const PopupChoosePiece: React.FC<Props> = ({ onChoosePiece }) => {
  const [queenImage] = useState('/assets/Pieces/wq.png')
  const [rookImage] = useState('/assets/Pieces/wr.png')
  const [bishopImage] = useState('/assets/Pieces/wb.png')
  const [knightImage] = useState('/assets/Pieces/wn.png')

  return (
    <article id='popup-choose-piece' className="bg-dark-square border-2 border-light-square rounded-lg p-5" hidden={true}>
      <header className="text-light-square font-bold text-2xl h-[5%] underline decoration-light-square decoration-2">Choose a piece</header>
      <br />
      <div className="flex flex-row justify-between">
        <ButtonChoosePiece id='button-choose-queen' image={queenImage} onChoosePiece={onChoosePiece} />
        <ButtonChoosePiece id='button-choose-bishop' image={bishopImage} onChoosePiece={onChoosePiece} />
        <ButtonChoosePiece id='button-choose-knight' image={knightImage} onChoosePiece={onChoosePiece} />
        <ButtonChoosePiece id='button-choose-rook' image={rookImage} onChoosePiece={onChoosePiece} />
      </div>
    </article>
  )
}
