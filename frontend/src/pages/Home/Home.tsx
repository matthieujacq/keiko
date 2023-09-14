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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("http://localhost:8000/pokemons")
      const data = await response.json()
      setPokemons(data)
      setIsLoading(false)
    }
    fetchPokemons()
  }, [])

  return (
    <>
      <h1 className={styles.title}>Pokedex</h1>
      {isLoading ? (
        // QUESTION: No transition ? (blinking loader not an issue ?)
        // QUESTION: Can we have more readable code?
        <div className={styles.loaderContainer}>
          <img src={LoaderLogo} alt="loader" />
        </div>
      ) : (
        <div className={styles.pokemonList}>
          {pokemons.map(({ name, id, weight, height }) => (
            <PokemonInfo name={name} id={id} weight={weight} height={height} key={id} />
          ))}
        </div>
      )}
    </>
  )
}
