import styles from "./Home.module.css"
import { Pokemon as PokemonInfo } from "components/Pokemon"
import { useEffect, useState } from "react"

interface PokemonInfo {
  name: string
  id: number
  height: number
  weight: number
}

export const Home = () => {
  const [filterValue, setFilterValue] = useState("")
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("http://localhost:8000/pokemons")
      const data = await response.json()
      setPokemons(data)
    }
    fetchPokemons()
  }, [])

  const onFilterUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  const filterByName = (pokemons: PokemonInfo[], filterValue: string) => {
    return pokemons.filter(({ name }) => name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
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
        <PokemonInfo name={name} id={id} key={id} />
      ))}
    </div>
  )
}
