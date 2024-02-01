import { ChessBoard } from './components/ChessBoard'

const App = (): JSX.Element => {
  return (
    <>
      <main className='flex justify-center lg:items-center h-[100vh] bg-slate-800'>
        <ChessBoard />
      </main>
    </>
  )
}

export default App
