import { PokemonInfo } from "pages/Home/Home"
import styles from "./Pokemon.module.css"

type Props = PokemonInfo

export const Pokemon = ({ name, id, weight, height }: Props) => {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <img alt={name} src={src} />
      <p>Id: {id}</p>
      <p>Weight: {weight} kg</p>
      <p>Height: {height} cm</p>
    </div>
  )
}
