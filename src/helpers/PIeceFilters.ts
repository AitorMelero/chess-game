import { type SquareModelType } from '../types/Square'

export const filterPieces = (squares: SquareModelType[], piecePositionFilter: (square: SquareModelType) => boolean): SquareModelType[] => {
  return squares.filter(piecePositionFilter)
}

export const whitePawnPositionFilter = (square: SquareModelType): boolean => {
  return square.yPosition === 2
}

export const blackPawnPositionFilter = (square: SquareModelType): boolean => {
  return square.yPosition === 7
}

export const whiteRookPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 1 && square.yPosition === 1) || (square.xPosition === 8 && square.yPosition === 1)
}

export const blackRookPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 1 && square.yPosition === 8) || (square.xPosition === 8 && square.yPosition === 8)
}

export const whiteKnightPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 2 && square.yPosition === 1) || (square.xPosition === 7 && square.yPosition === 1)
}

export const blackKnightPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 2 && square.yPosition === 8) || (square.xPosition === 7 && square.yPosition === 8)
}

export const whiteBishopPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 3 && square.yPosition === 1) || (square.xPosition === 6 && square.yPosition === 1)
}

export const blackBishopPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 3 && square.yPosition === 8) || (square.xPosition === 6 && square.yPosition === 8)
}

export const whiteQueenPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 4 && square.yPosition === 1
}

export const blackQueenPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 4 && square.yPosition === 8
}

export const whiteKingPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 5 && square.yPosition === 1
}

export const blackKingPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 5 && square.yPosition === 8
}
