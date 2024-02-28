import { useState } from 'react'
import { Chessboard } from './components/Chessboard'
import { AppModel } from './model/AppModel'
import { GameHistory } from './components/GameHistory'
import { Footer } from './components/Footer'

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
    <div className="py-8 min-h-[100vh] bg-[url('/assets/bg.avif')]">
      <main className="flex flex-col content-around items-center justify-around py-8 lg:flex-row min-h-[85vh]">
        <Chessboard chessboardModel={appModel.chessboard}/>
        <GameHistory goPreviousPlay={goPreviousPlay} goNextPlay={goNextPlay} restart={restart} />
      </main>

      <Footer />
    </div>
  )
}

export default App
