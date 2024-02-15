interface Props {
  onRestartGame: () => void
}

export const PopupCheckMate: React.FC<Props> = ({ onRestartGame }) => {
  return (
    <article id="popup-checkmate" className="bg-slate-600 rounded-lg p-5" hidden={true}>
      <header className="text-white text-lg">Checkmate</header>
      <br />
      <div className="flex flex-row justify-between">
        <button onClick={onRestartGame}>Restart Game</button>
      </div>
    </article>
  )
}
