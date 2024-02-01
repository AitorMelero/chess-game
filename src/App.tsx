import { ChessBoard } from './components/ChessBoard'

const App = (): JSX.Element => {
  return (
    <>
      <main className='flex justify-center items-center h-[100vh]'>
        <ChessBoard />
      </main>
    </>
  )
}

export default App
