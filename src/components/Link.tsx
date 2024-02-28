interface Props {
  name: string
  url: string
  svg: string
}

export const Link: React.FC<Props> = ({ name, url, svg }) => {
  return (
    <a href={url} className="mx-10 font-semibold flex flex-row text-light-square">
      <img src={svg} alt={`${name} image`} />
      <span>{name}</span>
    </a>
  )
}
