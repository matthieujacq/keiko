import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"
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

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:8000/pokemons")
        const data = await response.json()
        setPokemons(data)
      } catch (error) {
        console.error(error)
        // TODO: Handle error
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
      ) : (
        <div className={styles.pokemonList}>
          {pokemons.map(details => (
            <Pokemon {...details} key={details.id} />
          ))}
        </div>
      )}
    </>
  )
}
