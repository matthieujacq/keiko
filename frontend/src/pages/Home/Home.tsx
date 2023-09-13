import { Pokemon } from "components/Pokemon"
import styles from "./Home.module.css"

const pokemons = [
  { name: "Carapuce", id: 7 },
  { name: "Carabaffe", id: 8 },
  { name: "Tortank", id: 9 },
]

export const Home = () => {
  let pokemonFilterValue = ""

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pokemonFilterValue = event.target.value
    console.log(event.target.value)
  }

  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <div>
        <label htmlFor="search">Rechercher un pokemon: </label>
        <input id="search" type="text" className={styles.input} onChange={onInputChange} value={pokemonFilterValue} />
      </div>
      {pokemons.map(({ name, id }) => (
        <Pokemon name={name} id={id} key={id} />
      ))}
    </div>
  )
}
