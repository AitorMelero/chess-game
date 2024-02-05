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
import { Square } from '../components/Square'
import { type SquareProps, type PositionCoordinate } from '../types/Square'
import { useEffect, useState } from 'react'

interface useChessBoardType {
  getPieceFromInitPosition: (
    xPosition: number,
    yPosition: number
  ) => JSX.Element | undefined
  isPositionSelected: (xPosition: number, yPosition: number, selectedSquares: PositionCoordinate[]) => boolean
}

export const useChessBoard = (): useChessBoardType => {
  const [squares, setSquares] = useState<JSX.Element[]>([])
  const [selectedPositions, setSelectedPositions] = useState<PositionCoordinate[]>([])
  const [nextPossibleSquares, setNextPossibleSquares] = useState<PositionCoordinate[]>([])

  useEffect(() => {
    // setSquares(updateSquares())
  }, [selectedPositions])

  const paintNextPossibleSquares: SquareProps['paintNextPossibleSquares'] = (currentXPosition, currentYPosition) => {
    const currentPosition: PositionCoordinate = {
      xPosition: currentXPosition,
      yPosition: currentYPosition
    }
    const possibleMovesCoordinate: PositionCoordinate[] = [
      {
        xPosition: currentXPosition,
        yPosition: currentYPosition + 1
      }
    ]

    setSelectedPositions([currentPosition])
    setNextPossibleSquares(possibleMovesCoordinate)
  }

  const updateSquares: useChessBoardType['updateSquares'] = (selectedSquares, nextPossibleSquares) => {
    const squareElements: JSX.Element[] = []

    for (let y = 8; y > 0; y--) {
      for (let x = 1; x <= 8; x++) {
        const isSelected = isPositionSelected(x, y, selectedSquares)
        const piece = getPieceFromInitPosition(x, y)
        const square = (
          <Square
            key={x + '-' + y}
            xPosition={x}
            yPosition={y}
            piece={piece}
            isSelected={isSelected}
            isPossibleMove={false}
            paintNextPossibleSquares={paintNextPossibleSquares}
          />
        )
        squareElements.push(square)
      }
    }

    return squareElements
  }

  const isPositionSelected = (xPosition: number, yPosition: number, selectedSquares: PositionCoordinate[]): boolean => {
    let isSelected = false
    selectedSquares.forEach(square => {
      if (square.xPosition === xPosition && square.yPosition === yPosition) {
        isSelected = true
      }
    })

    return isSelected
  }

  const getPieceFromInitPosition = (
    xPosition: number,
    yPosition: number
  ): JSX.Element | undefined => {
    const isWhite = yPosition <= 2
    let piece: JSX.Element | undefined

    if (isPawn(yPosition)) {
      if (isWhite) {
        piece = <Piece svgImage={whitePawnImage} />
      } else {
        piece = <Piece svgImage={blackPawnImage} />
      }
    } else if (isRook(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece svgImage={whiteRookImage} />
      } else {
        piece = <Piece svgImage={blackRookImage} />
      }
    } else if (isKnight(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece svgImage={whiteKnightImage} />
      } else {
        piece = <Piece svgImage={blackKnightImage} />
      }
    } else if (isBishop(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece svgImage={whiteBishopImage} />
      } else {
        piece = <Piece svgImage={blackBishopImage} />
      }
    } else if (isQueen(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece svgImage={whiteQueenImage} />
      } else {
        piece = <Piece svgImage={blackQueenImage} />
      }
    } else if (isKing(xPosition, yPosition)) {
      if (isWhite) {
        piece = <Piece svgImage={whiteKingImage} />
      } else {
        piece = <Piece svgImage={blackKingImage} />
      }
    }

    return piece
  }

  const isPawn = (yPosition: number): boolean => {
    return yPosition === 7 || yPosition === 2
  }

  const isRook = (xPosition: number, yPosition: number): boolean => {
    return (
      (yPosition === 8 && xPosition === 1) ||
      (yPosition === 8 && xPosition === 8) ||
      (yPosition === 1 && xPosition === 1) ||
      (yPosition === 1 && xPosition === 8)
    )
  }

  const isKnight = (xPosition: number, yPosition: number): boolean => {
    return (
      (yPosition === 8 && xPosition === 2) ||
      (yPosition === 8 && xPosition === 7) ||
      (yPosition === 1 && xPosition === 2) ||
      (yPosition === 1 && xPosition === 7)
    )
  }

  const isBishop = (xPosition: number, yPosition: number): boolean => {
    return (
      (yPosition === 8 && xPosition === 3) ||
      (yPosition === 8 && xPosition === 6) ||
      (yPosition === 1 && xPosition === 3) ||
      (yPosition === 1 && xPosition === 6)
    )
  }

  const isQueen = (xPosition: number, yPosition: number): boolean => {
    return (
      (yPosition === 8 && xPosition === 4) ||
      (yPosition === 1 && xPosition === 4)
    )
  }

  const isKing = (xPosition: number, yPosition: number): boolean => {
    return (
      (yPosition === 8 && xPosition === 5) ||
      (yPosition === 1 && xPosition === 5)
    )
  }

  return {
    getPieceFromInitPosition,
    isPositionSelected
  }
}
