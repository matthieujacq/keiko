import styles from "./Home.module.css"
import LoaderLogo from "./loader.svg" // QUESTION: Shouldn't we put it in an assets folder?
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
    <>
      <h1 className={styles.title}>Pokedex</h1>
      {pokemons.length === 0 && (
        // QUESTION: No transition ?
        // QUESTION: Would it be better to use a ternary and explicitely replace the list with the loader?
        <div className={styles.loaderContainer}>
          <img src={LoaderLogo} alt="loader" />
        </div>
      )}
      <div className={styles.pokemonList}>
        {pokemons.map(({ name, id, weight, height }) => (
          <PokemonInfo name={name} id={id} weight={weight} height={height} key={id} />
        ))}
      </div>
    </>
  )
}
