import styles from "./Home.module.css"
import { Pokemon as PokemonInfo } from "components/Pokemon"
import { useEffect, useState } from "react"

export interface PokemonInfo {
  name: string
  id: number
  height: number
  weight: number
}

export const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("http://localhost:8000/pokemons")
      const data = await response.json()
      setPokemons(data)
    }
    fetchPokemons()
  }, [])

  return (
    <div className={styles.intro}>
      <h1>Pokedex</h1>
      {pokemons.map(({ name, id, weight, height }) => (
        <PokemonInfo name={name} id={id} weight={weight} height={height} key={id} />
      ))}
    </div>
  )
}
