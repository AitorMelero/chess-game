import { useSquarePositions } from '../hooks/useSquarePositions'
import { Piece } from './Piece'
import { Square } from './Square'
import pawn from '../assets/pawn.svg'
import rook from '../assets/rook.svg'
import knight from '../assets/knight.svg'
import bishop from '../assets/bishop.svg'
import queen from '../assets/queen.svg'
import king from '../assets/king.svg'

export const ChessBoard: React.FC = () => {
  const { squarePositions } = useSquarePositions()

  const paintPiece = (xPosition: number, yPosition: number): JSX.Element => {
    const isPawn = yPosition === 7 || yPosition === 2
    const isRook =
      (yPosition === 8 && xPosition === 1) ||
      (yPosition === 8 && xPosition === 8) ||
      (yPosition === 1 && xPosition === 1) ||
      (yPosition === 1 && xPosition === 8)
    const isKnight =
      (yPosition === 8 && xPosition === 2) ||
      (yPosition === 8 && xPosition === 7) ||
      (yPosition === 1 && xPosition === 2) ||
      (yPosition === 1 && xPosition === 7)
    const isBishop =
      (yPosition === 8 && xPosition === 3) ||
      (yPosition === 8 && xPosition === 6) ||
      (yPosition === 1 && xPosition === 3) ||
      (yPosition === 1 && xPosition === 6)
    const isQueen =
      (yPosition === 8 && xPosition === 4) ||
      (yPosition === 1 && xPosition === 4)
    const isKing =
      (yPosition === 8 && xPosition === 5) ||
      (yPosition === 1 && xPosition === 5)
    let piece = <></>

    if (isPawn) {
      piece = <Piece pieceSVG={pawn} />
    } else if (isRook) {
      piece = <Piece pieceSVG={rook} />
    } else if (isKnight) {
      piece = <Piece pieceSVG={knight} />
    } else if (isBishop) {
      piece = <Piece pieceSVG={bishop} />
    } else if (isQueen) {
      piece = <Piece pieceSVG={queen} />
    } else if (isKing) {
      piece = <Piece pieceSVG={king} />
    }

    return piece
  }

  return (
    <div className="grid grid-cols-8 w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vw] xl:w-[45vw] xl:h-[45vw] min-w-80 min-h-80">
      {squarePositions.map(({ xPosition, yPosition }) => (
        <Square
          key={xPosition.toString() + yPosition.toString()}
          xPosition={xPosition}
          yPosition={yPosition}
        >
          {paintPiece(xPosition, yPosition)}
        </Square>
      ))}
    </div>
  )
}
