interface Props {
  name: string
  number: number
}

export const Pokemon = ({ name, number }: Props) => {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`
  return (
    <div>
      <img alt="carapuce" src={src} />
      <p>Name: {name}</p>
      <p>Number: {number}</p>
    </div>
  )
}
