import { ButtonHistory } from './ButtonHistory'
import { PlaysHistory } from './PlaysHistory'

interface Props {
  goPreviousPlay: () => void
  goNextPlay: () => void
  restart: () => void
}

export const GameHistory: React.FC<Props> = ({ goPreviousPlay, goNextPlay, restart }) => {
  return (
    <section className="game-history">
      <h1 className='text-light-square font-bold text-2xl h-[5%]'>Game History</h1>

      <PlaysHistory />

      <article className='flex flex-row justify-between h-[7.5%]'>
        <ButtonHistory content={'Previous'} onClick={goPreviousPlay} />
        <ButtonHistory content={'Next'} onClick={goNextPlay} />
        <ButtonHistory content={'️Restart'} onClick={restart} />
      </article>
    </section>
  )
}
