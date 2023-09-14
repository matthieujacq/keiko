import { Loader } from "components/Loader"
import { PokemonInfo } from "pages/Home/Home"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styles from "./Pokemon.module.css"
import { parse } from "path"

export const Pokemon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [pokemon, setPokemon] = useState<PokemonInfo | undefined>(undefined)

  const { id } = useParams()

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (id === undefined || parseInt(id) < 1 || parseInt(id) > 151) {
          throw new Error("Invalid id")
        }
        setHasError(false)
        setIsLoading(true)
        const response = await fetch(`http://localhost:8000/pokemon/${id}`)
        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        setHasError(true)
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchPokemon()
  }, [id])

  const spriteEndpoint = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : hasError || pokemon === undefined ? (
        // QUESTION: Is there a better way hint typescript that the pokemon isn't undefined?
        <p>An error has occurred</p>
      ) : (
        <div className={styles.container}>
          <h1>{pokemon.name}</h1>
          <div>
            <img alt="front" src={`${spriteEndpoint}/${id}.png`} />
            <img alt="front" src={`${spriteEndpoint}/back/${id}.png`} />
          </div>
          <div>
            <img alt="front" src={`${spriteEndpoint}/shiny/${id}.png`} />
            <img alt="front" src={`${spriteEndpoint}/back/shiny/${id}.png`} />
          </div>
          <div>
            <p>Weight: {pokemon.weight}</p>
            <p>Height: {pokemon.height}</p>
            <p>Id: {pokemon.id}</p>
          </div>
        </div>
      )}
    </div>
  )
}
