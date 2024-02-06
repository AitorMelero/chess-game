import { useState } from 'react'
import { Chessboard } from './components/Chessboard'
import { AppModel } from './model/AppModel'

const App = (): JSX.Element => {
  const [appModel] = useState(new AppModel())

  return (
    <>
      <main className='flex justify-center lg:items-center h-[100vh] bg-slate-800'>
        <Chessboard chessboardModel={appModel.chessboard}/>
      </main>
    </>
  )
}

export default App
