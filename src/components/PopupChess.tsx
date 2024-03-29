import Popup from 'reactjs-popup'
import { type NewChoosePiece } from '../types/Piece'
import { PopupChoosePiece } from './PopupChoosePiece'
import { PopupCheckMate } from './PopupCheckMate'

interface Props {
  isLoading: boolean
  onChoosePiece: (newTypePiece: NewChoosePiece) => void
  onRestartGame: () => void
}

export const PopupChess: React.FC<Props> = ({ isLoading, onChoosePiece, onRestartGame }) => {
  return (
    <Popup modal nested open={true} position="center center">
      {isLoading
        ? (
        <></>
          )
        : (
          <section className='h-[100vh] w-[100vw] bg-black bg-opacity-50 flex flex-row justify-center items-center'>
            <PopupChoosePiece onChoosePiece={onChoosePiece} />
            <PopupCheckMate onRestartGame={onRestartGame}/>
          </section>
          )}
    </Popup>
  )
}
