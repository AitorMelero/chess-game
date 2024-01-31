import { Square } from './components/Square'

const App = (): JSX.Element => {
  return (
    <>
      <Square isWhite={false} />
      <Square isWhite={true} />
    </>
  )
}

export default App
