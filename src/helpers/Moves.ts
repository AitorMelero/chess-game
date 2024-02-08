import { type ChessboardModelType } from '../types/Chessboard'
import { type SquareModelType, type SquarePosition } from '../types/Square'

export const getBishopNextPossibleMoves = (square: SquareModelType): SquareModelType[] => {
  let nextPossibleSquares: SquareModelType[] = []

  if (square.piece !== undefined) {
    const piecePosition: SquarePosition = {
      xPosition: square.xPosition,
      yPosition: square.yPosition
    }
    const chessboard = square.chessboard

    // Up-Right move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextUpRightSquares(piecePosition, chessboard, square.piece.isWhite)
    ]

    // Down-Right move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextDownRightSquares(piecePosition, chessboard, square.piece.isWhite)
    ]

    // Down-Left move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextDownLeftSquares(piecePosition, chessboard, square.piece.isWhite)
    ]

    // Up-Left move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextLeftSquares(piecePosition, chessboard, square.piece.isWhite)
    ]
  }

  return nextPossibleSquares
}

const calculatePossibleNextUpRightSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false
  let xLoopPosition = piecePosition.xPosition + 1
  let yLoopPosition = piecePosition.yPosition + 1

  for (
    ;
    xLoopPosition <= 8 && yLoopPosition <= 8 && !isAllMove;
    xLoopPosition++, yLoopPosition++
  ) {
    const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
    const loopCurrentSquare = chessboard.getSquareFromPosition(position)
    if (loopCurrentSquare !== undefined) {
      if (loopCurrentSquare.piece !== undefined) {
        if (loopCurrentSquare.piece.isWhite !== isWhite) {
          nextPossibleSquares.push(loopCurrentSquare)
        }
        isAllMove = true
      } else {
        nextPossibleSquares.push(loopCurrentSquare)
      }
    } else {
      isAllMove = true
    }
  }

  return nextPossibleSquares
}

const calculatePossibleNextDownRightSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false
  let xLoopPosition = piecePosition.xPosition + 1
  let yLoopPosition = piecePosition.yPosition - 1

  for (
    ;
    xLoopPosition <= 8 && yLoopPosition > 0 && !isAllMove;
    xLoopPosition++, yLoopPosition--
  ) {
    const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
    const loopCurrentSquare = chessboard.getSquareFromPosition(position)
    if (loopCurrentSquare !== undefined) {
      if (loopCurrentSquare.piece !== undefined) {
        if (loopCurrentSquare.piece.isWhite !== isWhite) {
          nextPossibleSquares.push(loopCurrentSquare)
        }
        isAllMove = true
      } else {
        nextPossibleSquares.push(loopCurrentSquare)
      }
    } else {
      isAllMove = true
    }
  }

  return nextPossibleSquares
}

const calculatePossibleNextDownLeftSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false
  let xLoopPosition = piecePosition.xPosition - 1
  let yLoopPosition = piecePosition.yPosition - 1

  for (
    ;
    xLoopPosition > 0 && yLoopPosition > 0 && !isAllMove;
    xLoopPosition--, yLoopPosition--
  ) {
    const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
    const loopCurrentSquare = chessboard.getSquareFromPosition(position)
    if (loopCurrentSquare !== undefined) {
      if (loopCurrentSquare.piece !== undefined) {
        if (loopCurrentSquare.piece.isWhite !== isWhite) {
          nextPossibleSquares.push(loopCurrentSquare)
        }
        isAllMove = true
      } else {
        nextPossibleSquares.push(loopCurrentSquare)
      }
    } else {
      isAllMove = true
    }
  }

  return nextPossibleSquares
}

const calculatePossibleNextLeftSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false
  let xLoopPosition = piecePosition.xPosition - 1
  let yLoopPosition = piecePosition.yPosition + 1

  for (
    ;
    xLoopPosition > 0 && yLoopPosition <= 8 && !isAllMove;
    xLoopPosition--, yLoopPosition++
  ) {
    const position: SquarePosition = { xPosition: xLoopPosition, yPosition: yLoopPosition }
    const loopCurrentSquare = chessboard.getSquareFromPosition(position)
    if (loopCurrentSquare !== undefined) {
      if (loopCurrentSquare.piece !== undefined) {
        if (loopCurrentSquare.piece.isWhite !== isWhite) {
          nextPossibleSquares.push(loopCurrentSquare)
        }
        isAllMove = true
      } else {
        nextPossibleSquares.push(loopCurrentSquare)
      }
    } else {
      isAllMove = true
    }
  }

  return nextPossibleSquares
}
