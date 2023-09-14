import styles from "./Home.module.css"
import { PokemonCard } from "components/PokemonCard"
import { Loader } from "components/Loader"
import { useEffect, useState } from "react"

export interface PokemonInfo {
  name: string
  id: number
  height: number
  weight: number
}

export const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:8000/pokemons")
        // throw new Error("💥")
        const data = await response.json()
        setPokemons(data)
      } catch (error) {
        setHasError(true)
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchPokemons()
  }, [])

  return (
    <>
      <h1 className={styles.title}>Pokedex</h1>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <p className={styles.error}>An error has occurred</p>
      ) : (
        <div className={styles.pokemonList}>
          {pokemons.map(details => (
            <PokemonCard {...details} key={details.id} />
          ))}
        </div>
      )}
    </>
  )
}
