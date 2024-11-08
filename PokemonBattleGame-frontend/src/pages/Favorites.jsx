import React from "react";
import Header from "../components/Header";
import { usePokemon } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";

const Favorites = () => {
  const { favorites, handleRemoveFromFavorites } = usePokemon();
  console.log(favorites);
  if (favorites.length === 0) {
    return (
      <div>
        <Header />
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 min-h-screen p-8 flex flex-col items-center">
          <p className="text-white mt-4">No favorite Pokémon selected.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen p-8 flex flex-col items-center py-[3rem] px-[5rem]">
        <h1 className="text-3xl text-white mb-6">Your fighters</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              img={pokemon.sprites.front_default}
              name={pokemon.name}
              showRemoveButton={true}
              onRemove={() => handleRemoveFromFavorites(pokemon.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
