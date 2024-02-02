import { Piece } from '../components/Piece'
import whitePawn from '../assets/wp.png'
import whiteRook from '../assets/wr.png'
import whiteKnight from '../assets/wn.png'
import whiteBishop from '../assets/wb.png'
import whiteQueen from '../assets/wq.png'
import whiteKing from '../assets/wk.png'
import blackPawn from '../assets/bp.png'
import blackRook from '../assets/br.png'
import blackKnight from '../assets/bn.png'
import blackBishop from '../assets/bb.png'
import blackQueen from '../assets/bq.png'
import blackKing from '../assets/bk.png'

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
    const isWhite = yPosition <= 2
    let piece = <></>

    if (isPawn) {
      if (isWhite) {
        piece = <Piece pieceSVG={whitePawn} />
      } else {
        piece = <Piece pieceSVG={blackPawn} />
      }
    } else if (isRook) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteRook} />
      } else {
        piece = <Piece pieceSVG={blackRook} />
      }
    } else if (isKnight) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteKnight} />
      } else {
        piece = <Piece pieceSVG={blackKnight} />
      }
    } else if (isBishop) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteBishop} />
      } else {
        piece = <Piece pieceSVG={blackBishop} />
      }
    } else if (isQueen) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteQueen} />
      } else {
        piece = <Piece pieceSVG={blackQueen} />
      }
    } else if (isKing) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteKing} />
      } else {
        piece = <Piece pieceSVG={blackKing} />
      }
    }

    return piece
  }

  return {
    squarePositions: getSquarePositions(),
    getPieceFromInitPosition
  }
}
