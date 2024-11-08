import { useEffect, useState } from "react";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import Battle from "../components/Battle";
import { usePokemon } from "../contexts/PokemonContext";
import { useAuth } from "../contexts/AuthUserContext";

function BattlePage() {
  const { pokemons } = usePokemon();
  const [pokemonUser, setPokemonUser] = useState({});
  const [pokemonSystem, setPokemonSystem] = useState({});
  const { favorites } = usePokemon();

  useEffect(() => {
    if (pokemons.length > 0) {
      const randomId = Math.floor(Math.random() * pokemons.length);
      setPokemonSystem(pokemons[randomId]);
    }
  }, [pokemons]);

  function handlePickPokemon(name, img, base_stat) {
    const userPokemon = { name, img, base_stat };
    setPokemonUser(userPokemon);
  }

  return (
    <div>
      <Header />
      <main className="py-[3rem] px-[5rem]">
        <Battle
          pokemonUser={pokemonUser}
          pokemonSystem={pokemonSystem}
          setPokemonSystem={setPokemonSystem}
          setPokemonUser={setPokemonUser}
        />

        <h2 className="text-[1.4rem] text-white mt-[3rem]">Your Roster</h2>
        <div className="flex flex-wrap gap-[2rem] p-[5rem]">
          {favorites.map((pokemon) => (
            <PokemonCard
              img={pokemon.sprites.front_default}
              key={pokemon.name}
              name={pokemon.name}
              onClick={() =>
                handlePickPokemon(
                  pokemon.name,
                  pokemon.sprites.front_default,
                  pokemon.stats[0].base_stat
                )
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default BattlePage;
