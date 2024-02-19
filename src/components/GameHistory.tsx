import { ButtonHistory } from './ButtonHistory'

interface Props {
  goPreviousPlay: () => void
  goNextPlay: () => void
  restart: () => void
}

export const GameHistory: React.FC<Props> = ({ goPreviousPlay, goNextPlay, restart }) => {
  return (
    <section className="game-history">
      <h1 className='text-light-square'>Game History</h1>
      <article className='bg-light-square h-[75%]'>

      </article>
      <article className='flex flex-row justify-between'>
        <ButtonHistory content={'<'} onClick={goPreviousPlay} />
        <ButtonHistory content={'>'} onClick={goNextPlay} />
        <ButtonHistory content={'🏳️'} onClick={restart} />
      </article>
    </section>
  )
}
