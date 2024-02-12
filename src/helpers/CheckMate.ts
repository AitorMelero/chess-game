import { KingModel } from '../model'
import { type PieceModelType } from '../types/Piece'
import { type SquareModelType } from '../types/Square'

export const isCheck = (piece: PieceModelType, possibleSquare: SquareModelType): boolean => {
  const isWhite = piece.isWhite
  const chessboard = possibleSquare.chessboard
  const king = isWhite ? chessboard.whiteKing : chessboard.blackKing
  const opponentPieces = chessboard.pieces.filter(opponentPiece =>
    opponentPiece.isWhite !== isWhite && !(opponentPiece instanceof KingModel)
  )
  const opponentMoves: SquareModelType[] = []
  let isCheck = false

  if (king !== undefined) {
    const oldSquare = piece.square
    const oldPiece = possibleSquare.piece

    // Simulate the move
    simulateMove(piece, possibleSquare)
    opponentPieces.forEach(opponentPiece => {
      opponentPiece.calculatePossibleNextSquares().forEach(moveSquare =>
        opponentMoves.push(moveSquare))
    })

    if (opponentMoves.find(squareMove => squareMove === king.square) !== undefined) {
      isCheck = true
    }

    // Unsimulate the move
    piece.square = oldSquare
    possibleSquare.piece = oldPiece
  }

  return isCheck
}

const simulateMove = (piece: PieceModelType, newSquare: SquareModelType): void => {
  piece.square = newSquare
  newSquare.piece = piece
}
