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
      <h1 className='text-light-square font-bold text-2xl'>Game History</h1>

      <PlaysHistory />

      <article className='flex flex-row justify-between'>
        <ButtonHistory content={'<'} onClick={goPreviousPlay} />
        <ButtonHistory content={'>'} onClick={goNextPlay} />
        <ButtonHistory content={'🏳️'} onClick={restart} />
      </article>
    </section>
  )
}
