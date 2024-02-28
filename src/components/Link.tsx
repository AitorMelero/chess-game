interface Props {
  name: string
  url: string
  svg: string
}

export const Link: React.FC<Props> = ({ name, url, svg }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mx-2 sm:mx-5 px-3 py-2
      font-semibold text-light-square text-base sm:text-lg
      flex flex-row hover:bg-dark-square hover:opacity-90"
    >
      <img src={svg} alt={`${name} image`} />
      <span>{name}</span>
    </a>
  )
}
