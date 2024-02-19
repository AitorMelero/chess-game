import { ButtonHistory } from './ButtonHistory'

export const GameHistory: React.FC = () => {
  return (
    <section className="game-history">
      <h1 className='text-light-square'>Game History</h1>
      <article className='bg-light-square h-[85%]'>

      </article>
      <article>
        <ButtonHistory content={'+'} />
        <ButtonHistory content={'<'} />
        <ButtonHistory content={'>'} />
        <ButtonHistory content={'🏳️'} />
      </article>
    </section>
  )
}
