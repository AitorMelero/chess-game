import { useState } from 'react'
import { Chessboard } from './components/Chessboard'
import { AppModel } from './model/AppModel'
import { GameHistory } from './components/GameHistory'

const App = (): JSX.Element => {
  const [appModel] = useState(new AppModel())

  const goPreviousPlay = (): void => {
    console.log('Go Previous Play')
  }

  const goNextPlay = (): void => {
    console.log('Go Next Play')
  }

  const resign = (): void => {
    appModel.chessboard.restartGame()
  }

  return (
    <>
      <main className='flex justify-center lg:items-center h-[100vh] bg-slate-800'>
        <Chessboard chessboardModel={appModel.chessboard}/>
        <GameHistory goPreviousPlay={goPreviousPlay} goNextPlay={goNextPlay} resign={resign} />
      </main>
    </>
  )
}

export default App
