import { type SquareModelType } from '../types/Square'

const positionFilter = (squares: SquareModelType[], piecePositionFilter: (square: SquareModelType) => boolean): SquareModelType[] => {
  return squares.filter(piecePositionFilter)
}

const whitePawnPositionFilter = (square: SquareModelType): boolean => {
  return square.yPosition === 2
}

const blackPawnPositionFilter = (square: SquareModelType): boolean => {
  return square.yPosition === 7
}

const whiteRookPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 1 && square.yPosition === 1) || (square.xPosition === 8 && square.yPosition === 1)
}

const blackRookPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 1 && square.yPosition === 8) || (square.xPosition === 8 && square.yPosition === 8)
}

const whiteKnightPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 2 && square.yPosition === 1) || (square.xPosition === 7 && square.yPosition === 1)
}

const blackKnightPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 2 && square.yPosition === 8) || (square.xPosition === 7 && square.yPosition === 8)
}

const whiteBishopPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 3 && square.yPosition === 1) || (square.xPosition === 6 && square.yPosition === 1)
}

const blackBishopPositionFilter = (square: SquareModelType): boolean => {
  return (square.xPosition === 3 && square.yPosition === 8) || (square.xPosition === 6 && square.yPosition === 8)
}

const whiteQueenPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 4 && square.yPosition === 1
}

const blackQueenPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 4 && square.yPosition === 8
}

const whiteKingPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 5 && square.yPosition === 1
}

const blackKingPositionFilter = (square: SquareModelType): boolean => {
  return square.xPosition === 5 && square.yPosition === 8
}

export const PieceFilters = {
  blackBishopPositionFilter,
  blackKingPositionFilter,
  blackKnightPositionFilter,
  blackPawnPositionFilter,
  blackQueenPositionFilter,
  blackRookPositionFilter,
  positionFilter,
  whiteBishopPositionFilter,
  whiteKingPositionFilter,
  whiteKnightPositionFilter,
  whitePawnPositionFilter,
  whiteQueenPositionFilter,
  whiteRookPositionFilter
}
