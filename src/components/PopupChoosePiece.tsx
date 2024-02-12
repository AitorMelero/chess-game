import Popup from 'reactjs-popup'
import { ButtonChoosePiece } from './ButtonChoosePiece'
import { useState } from 'react'

interface Props {
  isWhite: boolean
}

export const PopupChoosePiece: React.FC<Props> = ({ isWhite }) => {
  const colorLetter = isWhite ? 'w' : 'b'
  const [queenImage] = useState(`./src/assets/Pieces/${colorLetter}q.png`)
  const [rookImage] = useState(`./src/assets/Pieces/${colorLetter}r.png`)
  const [bishopImage] = useState(`./src/assets/Pieces/${colorLetter}b.png`)
  const [knightImage] = useState(`./src/assets/Pieces/${colorLetter}n.png`)

  return (
    <Popup
      modal
      nested
      open={true}
      position="center center"
    >
      <section className='bg-slate-600 rounded-lg p-5'>
        <header className='text-white text-lg'>
          Choose a piece
        </header>
        <br />
        <div className='flex flex-row justify-between'>
          <ButtonChoosePiece image={queenImage} />
          <ButtonChoosePiece image={bishopImage} />
          <ButtonChoosePiece image={knightImage} />
          <ButtonChoosePiece image={rookImage} />
        </div>
      </section>
    </Popup>
  )
}
