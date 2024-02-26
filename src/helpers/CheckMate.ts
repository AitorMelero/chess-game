import { KingModel, PawnModel } from '../model'
import { type ChessboardModelType } from '../types/Chessboard'
import { type PieceModelType } from '../types/Piece'
import { type SquarePosition, type SquareModelType } from '../types/Square'

export const isCheckmate = (chessboard: ChessboardModelType): boolean => {
  const isWhiteTurn = chessboard.currentPlayer.isWhite
  const king = isWhiteTurn ? chessboard.whiteKing : chessboard.blackKing
  const pieces = chessboard.pieces.filter(piece => piece.isWhite === isWhiteTurn)
  let isMate = false

  if (isKingInCheck(king?.square, isWhiteTurn)) {
    const isPossibleMoves = pieces.filter(
      piece => piece.calculatePossibleNextSquares().filter(
        possibleSquare => !isMoveInCheck(piece, possibleSquare)
      ).length > 0).length > 0

    if (!isPossibleMoves) {
      isMate = true
    }
  }

  return isMate
}

export const isCheck = (chessboard: ChessboardModelType): boolean => {
  const isWhite = chessboard.currentPlayer.isWhite
  const king = isWhite ? chessboard.whiteKing : chessboard.blackKing
  const opponentKing = isWhite ? chessboard.blackKing : chessboard.whiteKing
  const kingSquare = king?.square
  const opponentPieces = chessboard.pieces.filter(piece => piece.isWhite !== isWhite && piece !== opponentKing)
  let opponentMoves: SquareModelType[] = []
  opponentPieces.forEach(piece => {
    opponentMoves = [...opponentMoves, ...piece.calculatePossibleNextSquares()]
  })

  return opponentMoves.find(move => move === kingSquare) !== undefined
}

export const isMoveInCheck = (piece: PieceModelType, possibleSquare: SquareModelType): boolean => {
  const isWhite = piece.isWhite
  const chessboard = possibleSquare.chessboard
  const king = isWhite ? chessboard.whiteKing : chessboard.blackKing
  const opponentMoves: SquareModelType[] = []
  let isCheck = false
  const oldSquare = piece.square
  const oldPiece = possibleSquare.piece

  if (king !== undefined && oldSquare !== undefined) {
    // Simulate the move
    const oldPosition: SquarePosition = {
      xPosition: oldSquare.xPosition,
      yPosition: oldSquare.yPosition
    }
    const newPosition: SquarePosition = {
      xPosition: possibleSquare.xPosition,
      yPosition: possibleSquare.yPosition
    }
    simulateMove(chessboard, oldPosition, newPosition)

    // Check if it is check
    const opponentPieces = chessboard.pieces.filter(opponentPiece =>
      opponentPiece.isWhite !== isWhite && !(opponentPiece instanceof KingModel)
    )

    opponentPieces.forEach(opponentPiece => {
      opponentPiece.calculatePossibleNextSquares().forEach(moveSquare =>
        opponentMoves.push(moveSquare)
      )
    })

    if (opponentMoves.find(squareMove => squareMove === king.square) !== undefined) {
      isCheck = true
    }

    // Unsimulate the move
    unsimulateMove(chessboard, oldPosition, newPosition, oldPiece)
  }

  return isCheck
}

export const isKingInCheck = (square: SquareModelType | undefined, isWhite: boolean): boolean => {
  let isCheck = false

  if (square !== undefined) {
    isCheck = isCheckInSquare(square, isWhite)
  }

  return isCheck
}

export const isCheckInSquare = (square: SquareModelType, isWhite: boolean): boolean => {
  let isCheck = false

  isCheck = square.chessboard.pieces.filter(
    piece => !(piece instanceof KingModel) && piece.isWhite !== isWhite && piece.calculatePossibleNextSquares().find(
      compareSquare => compareSquare === square
    )
  ).length > 0

  return isCheck
}

const simulateMove = (
  chessboard: ChessboardModelType,
  initPosition: SquarePosition,
  finishPosition: SquarePosition
): void => {
  const piece = chessboard.getSquareFromPosition(initPosition)?.piece
  const square = chessboard.getSquareFromPosition(finishPosition)

  if (piece !== undefined && square !== undefined) {
    const isPawn = piece instanceof PawnModel
    const isSimulation = true
    piece.unpaintInSquare(isSimulation)
    if (isPawn) {
      // Don't show the popup to change pawn for new piece
      piece.paintInSquare(square, isSimulation)
    } else {
      piece.paintInSquare(square)
    }
  }
}

const unsimulateMove = (
  chessboard: ChessboardModelType,
  initPosition: SquarePosition,
  finishPosition: SquarePosition,
  oldPiece: PieceModelType | undefined
): void => {
  const piece = chessboard.getSquareFromPosition(finishPosition)?.piece
  const initSquare = chessboard.getSquareFromPosition(initPosition)
  const finishSquare = chessboard.getSquareFromPosition(finishPosition)

  if (piece !== undefined && initSquare !== undefined && finishSquare !== undefined) {
    piece.unpaintInSquare(true)
    piece.paintInSquare(initSquare)
    finishSquare.piece = oldPiece
    if (oldPiece !== undefined) {
      oldPiece.paintInSquare(finishSquare)
    }
  }
}
