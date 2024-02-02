import { Piece } from '../components/Piece'
import {
  blackBishopImage,
  blackKingImage,
  blackKnightImage,
  blackPawnImage,
  blackQueenImage,
  blackRookImage,
  whiteBishopImage,
  whiteKingImage,
  whiteKnightImage,
  whitePawnImage,
  whiteQueenImage,
  whiteRookImage
} from '../assets/Pieces/index'

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
        piece = <Piece pieceSVG={whitePawnImage} />
      } else {
        piece = <Piece pieceSVG={blackPawnImage} />
      }
    } else if (isRook) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteRookImage} />
      } else {
        piece = <Piece pieceSVG={blackRookImage} />
      }
    } else if (isKnight) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteKnightImage} />
      } else {
        piece = <Piece pieceSVG={blackKnightImage} />
      }
    } else if (isBishop) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteBishopImage} />
      } else {
        piece = <Piece pieceSVG={blackBishopImage} />
      }
    } else if (isQueen) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteQueenImage} />
      } else {
        piece = <Piece pieceSVG={blackQueenImage} />
      }
    } else if (isKing) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteKingImage} />
      } else {
        piece = <Piece pieceSVG={blackKingImage} />
      }
    }

    return piece
  }

  return {
    squarePositions: getSquarePositions(),
    getPieceFromInitPosition
  }
}
