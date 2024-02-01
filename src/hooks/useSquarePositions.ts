interface squarePositionsType {
  xPosition: number
  yPosition: number
}

interface useSquarePositionsType {
  squarePositions: squarePositionsType[]
}

export const useSquarePositions = (): useSquarePositionsType => {
  const getSquarePositions = (): squarePositionsType[] => {
    const squarePositions: squarePositionsType[] = []

    for (let y = 8; y > 0; y--) {
      for (let x = 1; x <= 8; x++) {
        squarePositions.push({ xPosition: x, yPosition: y })
      }
    }

    return squarePositions
  }

  return {
    squarePositions: getSquarePositions()
  }
}
