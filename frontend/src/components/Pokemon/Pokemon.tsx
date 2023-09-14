import styles from "./Pokemon.module.css"

interface Props {
  name: string
  id: number
}

export const Pokemon = ({ name, id }: Props) => {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <img alt={name} src={src} />
      <p>Id: {id}</p>
    </div>
  )
}
