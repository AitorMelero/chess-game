interface Props {
  content: string
  onClick: () => void
}

export const ButtonHistory: React.FC<Props> = ({ content, onClick }) => {
  return (
    <button
      className="bg-dark-square hover:bg-dark-square-hover w-[30%] border-2 border-light-square rounded-md text-light-square text-sm xl:text-lg font-bold"
      onClick={onClick}
    >
      {content}
    </button>
  )
}
