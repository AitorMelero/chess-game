interface Props {
  content: string
  onClick: () => void
}

export const ButtonHistory: React.FC<Props> = ({ content, onClick }) => {
  return (
    <button
      className="bg-dark-square w-[30%] border-2 border-light-square rounded-md text-light-square"
      onClick={onClick}
    >
      {content}
    </button>
  )
}
