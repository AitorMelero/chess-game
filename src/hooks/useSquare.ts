interface UseSquare {
  bgColor: string
  coordinateColor: string
  numberPosition: string
  letterPosition: string
}

export const useSquare = ({ xPosition, yPosition }: { xPosition: number, yPosition: number }): UseSquare => {
  const getBgColor = (): string => {
    const isBlack = (xPosition + yPosition) % 2 === 0
    let bgColor = 'bg-light-square'

    if (isBlack) {
      bgColor = 'bg-dark-square'
    }

    return bgColor
  }

  const getCoordinateColor = (): string => {
    const isBlack = (xPosition + yPosition) % 2 === 0
    let bgColor = 'text-dark-square'

    if (isBlack) {
      bgColor = 'text-light-square'
    }

    return bgColor
  }

  const getNumberPosition = (): string => {
    const hasNumberCoordinate = xPosition === 1
    let numberPosition = ''

    if (hasNumberCoordinate) {
      numberPosition = yPosition.toString()
    }

    return numberPosition
  }

  const getLetterPosition = (): string => {
    const hasLetterCoordinate = yPosition === 1
    let letterPosition = ''

    if (hasLetterCoordinate) {
      const aCharCode = 97
      letterPosition = String.fromCharCode(xPosition - 1 + aCharCode)
    }

    return letterPosition
  }

  return {
    bgColor: getBgColor(),
    coordinateColor: getCoordinateColor(),
    numberPosition: getNumberPosition(),
    letterPosition: getLetterPosition()
  }
}
