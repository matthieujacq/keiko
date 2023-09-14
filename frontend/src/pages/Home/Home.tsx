import styles from "./Home.module.css"
import LoaderLogo from "assets/loader.svg"
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
