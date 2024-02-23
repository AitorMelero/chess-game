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
    <>
      <main className='flex justify-center lg:items-center h-[100vh] bg-slate-800'>
        <Chessboard chessboardModel={appModel.chessboard}/>
        <GameHistory goPreviousPlay={goPreviousPlay} goNextPlay={goNextPlay} restart={restart} />
      </main>
    </>
  )
}

export default App
