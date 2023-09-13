interface Props {
  name: string
  id: number
}

export const Pokemon = ({ name, id }: Props) => {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div>
      <img alt={name} src={src} />
      <p>Name: {name}</p>
      <p>Number: {id}</p>
    </div>
  )
}
