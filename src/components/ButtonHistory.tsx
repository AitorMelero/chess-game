interface Props {
  content: string
}

export const ButtonHistory: React.FC<Props> = ({ content }) => {
  return (
    <button>{content}</button>
  )
}
