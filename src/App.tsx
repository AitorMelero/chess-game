import { Square } from './components/Square'

const App = (): JSX.Element => {
  return (
    <>
      <Square xPosition={1} yPosition={1} isWhite={false} />
      <Square xPosition={1} yPosition={2} isWhite={true} />
    </>
  )
}

export default App
