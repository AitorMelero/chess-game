import { type ChessboardModelType } from '../types/Chessboard'
import { type SquareModelType, type SquarePosition } from '../types/Square'

export const getKingNextPossibleMoves = (square: SquareModelType): SquareModelType[] => {
  let nextPossibleSquares: SquareModelType[] = []
  let otherKingPossibleMoves: SquareModelType[] = []

  if (square.piece !== undefined) {
    const isWhite = square.piece.isWhite
    const otherKing = isWhite ? square.chessboard.blackKing : square.chessboard.whiteKing

    if (otherKing?.square !== undefined) {
      otherKingPossibleMoves = getMovesWithoutAdjacentKing(otherKing.square)
    }
    nextPossibleSquares = getMovesWithoutAdjacentKing(square).filter(
      possibleSquare => otherKingPossibleMoves.find(
        otherKingSquare => otherKingSquare === possibleSquare
      ) === undefined
    )
  }

  return nextPossibleSquares
}

export const getRookNextPossibleMoves = (square: SquareModelType): SquareModelType[] => {
  let nextPossibleSquares: SquareModelType[] = []

  if (square.piece !== undefined) {
    const piecePosition: SquarePosition = { xPosition: square.xPosition, yPosition: square.yPosition }
    const chessboard = square.chessboard

    // Up move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextUpSquares(piecePosition, chessboard, square.piece.isWhite)
    ]

    // Right move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextRightSquares(piecePosition, chessboard, square.piece.isWhite)
    ]

    // Down move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextDownSquares(piecePosition, chessboard, square.piece.isWhite)
    ]

    // Left move
    nextPossibleSquares = [
      ...nextPossibleSquares,
      ...calculatePossibleNextLeftSquares(piecePosition, chessboard, square.piece.isWhite)
    ]
  }

  return nextPossibleSquares
}

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
      ...calculatePossibleNextUpLeftSquares(piecePosition, chessboard, square.piece.isWhite)
    ]
  }

  return nextPossibleSquares
}

const getMovesWithoutAdjacentKing = (square: SquareModelType): SquareModelType[] => {
  let nextPossibleSquares: SquareModelType[] = []

  if (square.piece !== undefined) {
    nextPossibleSquares = [
      ...getRookNextPossibleMoves(square),
      ...getBishopNextPossibleMoves(square)
    ].filter(filterSquare => {
      return (
        (filterSquare.xPosition === square.xPosition && filterSquare.yPosition === square.yPosition + 1) ||
          (filterSquare.xPosition === square.xPosition + 1 && filterSquare.yPosition === square.yPosition + 1) ||
          (filterSquare.xPosition === square.xPosition + 1 && filterSquare.yPosition === square.yPosition) ||
          (filterSquare.xPosition === square.xPosition + 1 && filterSquare.yPosition === square.yPosition - 1) ||
          (filterSquare.xPosition === square.xPosition && filterSquare.yPosition === square.yPosition - 1) ||
          (filterSquare.xPosition === square.xPosition - 1 && filterSquare.yPosition === square.yPosition - 1) ||
          (filterSquare.xPosition === square.xPosition - 1 && filterSquare.yPosition === square.yPosition) ||
          (filterSquare.xPosition === square.xPosition - 1 && filterSquare.yPosition === square.yPosition + 1)
      )
    })
  }

  return nextPossibleSquares
}

const calculatePossibleNextUpSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false

  for (let y = piecePosition.yPosition + 1; y <= 8 && !isAllMove; y++) {
    const position: SquarePosition = { xPosition: piecePosition.xPosition, yPosition: y }
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
    }
  }

  return nextPossibleSquares
}

const calculatePossibleNextRightSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false

  for (let x = piecePosition.xPosition + 1; x <= 8 && !isAllMove; x++) {
    const position: SquarePosition = { xPosition: x, yPosition: piecePosition.yPosition }
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
    }
  }

  return nextPossibleSquares
}

const calculatePossibleNextDownSquares = (
  piecePosition: SquarePosition,
  chessboard: ChessboardModelType,
  isWhite: boolean
): SquareModelType[] => {
  const nextPossibleSquares: SquareModelType[] = []
  let isAllMove = false

  for (let y = piecePosition.yPosition - 1; y > 0 && !isAllMove; y--) {
    const position: SquarePosition = { xPosition: piecePosition.xPosition, yPosition: y }
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

  for (let x = piecePosition.xPosition - 1; x > 0 && !isAllMove; x--) {
    const position: SquarePosition = { xPosition: x, yPosition: piecePosition.yPosition }
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
    }
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

const calculatePossibleNextUpLeftSquares = (
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
