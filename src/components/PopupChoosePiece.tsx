import { ButtonChoosePiece } from './ButtonChoosePiece'
import { useState } from 'react'
import { type NewChoosePiece } from '../types/Piece'

interface Props {
  onChoosePiece: (newTypePiece: NewChoosePiece) => void
}

export const PopupChoosePiece: React.FC<Props> = ({ onChoosePiece }) => {
  const [queenImage] = useState('./src/assets/Pieces/wq.png')
  const [rookImage] = useState('./src/assets/Pieces/wr.png')
  const [bishopImage] = useState('./src/assets/Pieces/wb.png')
  const [knightImage] = useState('./src/assets/Pieces/wn.png')

  return (
    <article id='popup-choose-piece' className="bg-slate-600 rounded-lg p-5" hidden={false}>
      <header className="text-white text-lg">Choose a piece</header>
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
