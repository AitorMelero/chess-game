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
  getSquarePositions: () => squarePositionsType[]
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
    const isWhite = yPosition <= 2
    let piece = <></>

    if (isPawn(yPosition)) {
      if (isWhite) {
        piece = <Piece pieceSVG={whitePawnImage} initXPosition={xPosition} initYPosition={yPosition} />
      } else {
        piece = <Piece pieceSVG={blackPawnImage} initXPosition={xPosition} initYPosition={yPosition} />
      }
    } else if (isRook(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteRookImage} initXPosition={xPosition} initYPosition={yPosition} />
      } else {
        piece = <Piece pieceSVG={blackRookImage} initXPosition={xPosition} initYPosition={yPosition} />
      }
    } else if (isKnight(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteKnightImage} initXPosition={xPosition} initYPosition={yPosition} />
      } else {
        piece = <Piece pieceSVG={blackKnightImage} initXPosition={xPosition} initYPosition={yPosition} />
      }
    } else if (isBishop(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteBishopImage} initXPosition={xPosition} initYPosition={yPosition} />
      } else {
        piece = <Piece pieceSVG={blackBishopImage} initXPosition={xPosition} initYPosition={yPosition} />
      }
    } else if (isQueen(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteQueenImage} initXPosition={xPosition} initYPosition={yPosition} />
      } else {
        piece = <Piece pieceSVG={blackQueenImage} initXPosition={xPosition} initYPosition={yPosition} />
      }
    } else if (isKing(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece pieceSVG={whiteKingImage} initXPosition={xPosition} initYPosition={yPosition} />
      } else {
        piece = <Piece pieceSVG={blackKingImage} initXPosition={xPosition} initYPosition={yPosition} />
      }
    }

    return piece
  }

  const isPawn = (yPosition: number): boolean => {
    return yPosition === 7 || yPosition === 2
  }

  const isRook = (xPosition: number, yPosition: number): boolean => {
    return (yPosition === 8 && xPosition === 1) ||
      (yPosition === 8 && xPosition === 8) ||
      (yPosition === 1 && xPosition === 1) ||
      (yPosition === 1 && xPosition === 8)
  }

  const isKnight = (xPosition: number, yPosition: number): boolean => {
    return (yPosition === 8 && xPosition === 2) ||
      (yPosition === 8 && xPosition === 7) ||
      (yPosition === 1 && xPosition === 2) ||
      (yPosition === 1 && xPosition === 7)
  }

  const isBishop = (xPosition: number, yPosition: number): boolean => {
    return (yPosition === 8 && xPosition === 3) ||
      (yPosition === 8 && xPosition === 6) ||
      (yPosition === 1 && xPosition === 3) ||
      (yPosition === 1 && xPosition === 6)
  }

  const isQueen = (xPosition: number, yPosition: number): boolean => {
    return (yPosition === 8 && xPosition === 4) ||
      (yPosition === 1 && xPosition === 4)
  }

  const isKing = (xPosition: number, yPosition: number): boolean => {
    return (yPosition === 8 && xPosition === 5) ||
      (yPosition === 1 && xPosition === 5)
  }

  return {
    getPieceFromInitPosition,
    getSquarePositions
  }
}
