interface Props {
  onRestartGame: () => void
}

export const PopupCheckMate: React.FC<Props> = ({ onRestartGame }) => {
  return (
    <article id="popup-checkmate" className="bg-dark-square border-2 border-light-square rounded-lg p-5" hidden={true}>
      <header className="text-light-square font-bold text-2xl h-[5%] underline decoration-light-square decoration-2">Checkmate</header>
      <br />
      <div className="text-light-square hover:opacity-60 text-center">
        <button onClick={onRestartGame}>Restart Game</button>
      </div>
    </article>
  )
}
