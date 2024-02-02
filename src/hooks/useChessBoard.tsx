import { Piece } from '../components/Piece'
import pawn from '../assets/wp.png'
import rook from '../assets/wr.png'
import knight from '../assets/wn.png'
import bishop from '../assets/wb.png'
import queen from '../assets/wq.png'
import king from '../assets/wk.png'

interface squarePositionsType {
  xPosition: number
  yPosition: number
}

interface useSquarePositionsType {
  squarePositions: squarePositionsType[]
  getPieceFromInitPosition: (
    xPosition: number,
    yPosition: number
  ) => JSX.Element
}

export const useChessBoard = (): useSquarePositionsType => {
  const getSquarePositions = (): squarePositionsType[] => {
    const squarePositions: squarePositionsType[] = []

    for (let y = 8; y > 0; y--) {
      for (let x = 1; x <= 8; x++) {
        squarePositions.push({ xPosition: x, yPosition: y })
      }
    }

    return squarePositions
  }

  const getPieceFromInitPosition = (
    xPosition: number,
    yPosition: number
  ): JSX.Element => {
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

  return {
    squarePositions: getSquarePositions(),
    getPieceFromInitPosition
  }
}
