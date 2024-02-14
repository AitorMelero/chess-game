export const PopupCheckMate: React.FC = () => {
  return (
    <article id="popup-checkmate" className="bg-slate-600 rounded-lg p-5" hidden={true}>
      <header className="text-white text-lg">Checkmate</header>
      <br />
      <div className="flex flex-row justify-between">
        <button>Restart Game</button>
      </div>
    </article>
  )
}
