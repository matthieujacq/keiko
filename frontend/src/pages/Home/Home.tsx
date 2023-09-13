import { Pokemon } from "components/Pokemon"
import styles from "./Home.module.css"
import React from "react"

const pokemons = [
  { name: "Carapuce", id: 7 },
  { name: "Carabaffe", id: 8 },
  { name: "Tortank", id: 9 },
]

export class Home extends React.Component {
  state = {
    pokemonFilterValue: "",
  }

  onFilterUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pokemonFilterValue: event.target.value })
    // console.log(this.state.pokemonFilterValue) // not up to date because set state is async
    // console.log(event.target.value)
  }

  render() {
    return (
      <div className={styles.intro}>
        <div>Bienvenue sur ton futur pokédex !</div>
        <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
        <div>
          <label htmlFor="search">Rechercher un pokemon: </label>
          <input
            id="search"
            type="text"
            className={styles.input}
            onChange={this.onFilterUpdate}
            value={this.state.pokemonFilterValue}
          />
        </div>
        {pokemons
          .filter(({ name }) => name.toLocaleLowerCase().includes(this.state.pokemonFilterValue.toLocaleLowerCase()))
          .map(({ name, id }) => (
            <Pokemon name={name} id={id} key={id} />
          ))}
      </div>
    )
  }
}
