import styles from "./Home.module.css"
import { PokemonCard } from "components/PokemonCard"
import { Loader } from "components/Loader"
import { useEffect, useState } from "react"
import { ErrorMessage } from "components/ErrorMessage"
import { Link, useParams } from "react-router-dom"

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
  const params = useParams()
  const page = +(params.page ?? 0)

  console.log("params", params)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true)
        if (isNaN(page) || page < 1) {
          throw new Error()
        }
        const response = await fetch(`http://localhost:8000/pokemons?page=${page - 1}`)
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        setPokemons(data)
        setHasError(false)
      } catch (error) {
        setHasError(true)
      }
      setIsLoading(false)
    }
    fetchPokemons()
  }, [page])

  return (
    <>
      <h1 className={styles.title}>Pokedex</h1>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <ErrorMessage />
      ) : (
        <>
          <div className={styles.pagination}>
            {page > 1 ? <Link to={`/pokedex/${page - 1}`}>&lt;</Link> : <span> </span>}
            <span>{page}</span>
            <Link to={`/pokedex/${page + 1}`}>&gt;</Link>
          </div>
          <div className={styles.pokemonList}>
            {pokemons.map(details => (
              <Link to={`/pokemon/${details.id}`} key={details.id}>
                <PokemonCard {...details} />
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}
