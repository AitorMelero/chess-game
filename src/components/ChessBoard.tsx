import { useChessBoard } from '../hooks/useChessBoard'

export const ChessBoard: React.FC = () => {
  const { getSquares } = useChessBoard()

  return (
    <div className="grid grid-cols-8 w-[90vw] h-[90vw] lg:w-[70vw] lg:h-[70vw] xl:w-[45vw] xl:h-[45vw] min-w-80 min-h-80">
      {getSquares()}
    </div>
  )
}
