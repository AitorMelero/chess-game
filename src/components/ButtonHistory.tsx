interface Props {
  content: string
  onClick: () => void
}

export const ButtonHistory: React.FC<Props> = ({ content, onClick }) => {
  return (
    <button
      className="bg-dark-square w-1/4 rounded-md text-light-square"
      onClick={onClick}
    >
      {content}
    </button>
  )
}
