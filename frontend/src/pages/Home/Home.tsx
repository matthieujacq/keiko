import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"
import { useState } from "react"

interface Pokemon {
  name: string
  id: number
}
const pokemons: Pokemon[] = [
  { name: "Carapuce", id: 7 },
  { name: "Carabaffe", id: 8 },
  { name: "Tortank", id: 9 },
]

function filterByName(pokemons: Pokemon[], filterValue: string) {
  return pokemons.filter(({ name }) => name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
}

export const Home = () => {
  const [filterValue, setFilterValue] = useState("")

  const onFilterUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <div>
        <label htmlFor="search">Rechercher un pokemon: </label>
        <input id="search" type="text" className={styles.input} onChange={onFilterUpdate} value={filterValue} />
      </div>
      {filterByName(pokemons, filterValue).map(({ name, id }) => (
        <Pokemon name={name} id={id} key={id} />
      ))}
    </div>
  )
}
