import { useState } from 'react'
import { Chessboard } from './components/Chessboard'
import { AppModel } from './model/AppModel'
import { GameHistory } from './components/GameHistory'

const App = (): JSX.Element => {
  const [appModel] = useState(new AppModel())

  const goPreviousPlay = (): void => {
    appModel.chessboard.gameHistory.goPreviousPlay(appModel.chessboard)
  }

  const goNextPlay = (): void => {
    appModel.chessboard.gameHistory.goNextPlay(appModel.chessboard)
  }

  const restart = (): void => {
    appModel.chessboard.restartGame()
  }

  return (
    <main className="flex flex-col content-around items-center justify-around lg:flex-row min-h-[100vh] bg-[url('assets/bg.avif')]">
      <Chessboard chessboardModel={appModel.chessboard}/>
      <GameHistory goPreviousPlay={goPreviousPlay} goNextPlay={goNextPlay} restart={restart} />
    </main>
  )
}

export default App
