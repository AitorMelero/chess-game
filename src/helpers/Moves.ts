import { type KingModel } from '../model'
import { type ChessboardModelType } from '../types/Chessboard'
import { type SquareModelType, type SquarePosition } from '../types/Square'

export const getKingNextPossibleMoves = (square: SquareModelType): SquareModelType[] => {
  let nextPossibleSquares: SquareModelType[] = []

  if (square.piece !== undefined) {
    const king: KingModel = square.piece as KingModel

    nextPossibleSquares = getTotalMovesKing(square).filter(
      possibleSquare => !isKingCheckMove(king, possibleSquare)
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

const getTotalMovesKing = (square: SquareModelType): SquareModelType[] => {
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

const isKingCheckMove = (king: KingModel, square: SquareModelType): boolean => {
  const chessboard = square.chessboard
  const currentKingSquare = king.square
  const currentSquarePiece = square.piece
  const allOpponentPieces = king.isWhite
    ? chessboard.pieces.filter(piece => !piece.isWhite && piece !== chessboard.blackKing)
    : chessboard.pieces.filter(piece => piece.isWhite && piece !== chessboard.whiteKing)
  let allOpponentPossibleMoves: SquareModelType[] = []

  // Simulate the king move
  king.square = square
  square.piece = king

  // Add oppenent pieces moves
  if (king.isWhite && chessboard.blackKing?.square !== undefined) {
    allOpponentPossibleMoves = [...allOpponentPossibleMoves, ...getTotalMovesKing(chessboard.blackKing.square)]
  } else if (!king.isWhite && chessboard.whiteKing?.square !== undefined) {
    allOpponentPossibleMoves = [...allOpponentPossibleMoves, ...getTotalMovesKing(chessboard.whiteKing.square)]
  }
  allOpponentPieces.forEach(piece => {
    allOpponentPossibleMoves = [...allOpponentPossibleMoves, ...piece.calculatePossibleNextSquares()]
  })

  // Undone simulate the king move
  king.square = currentKingSquare
  square.piece = currentSquarePiece

  return allOpponentPossibleMoves.find(opponentSquare => opponentSquare === square) !== undefined
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
