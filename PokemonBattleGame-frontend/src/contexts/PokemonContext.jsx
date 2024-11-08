import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from './AuthUserContext';
import axios from "axios";

const initialState = {
  pokemons: [],
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setPokemons":
      return { ...state, pokemons: action.payload };
    case "setFavorites":
      return { ...state, favorites: action.payload };
    case "addToFavorites":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "removeFromFavorites":
      return {
        ...state,
        favorites: state.favorites.filter((pokemon) => pokemon.id !== action.payload),
      };
    default:
      return state;
  }
}
const pokemonContext = createContext();

function PokemonProvider({ children }) {
  const { user, isAuthenticated } = useAuth(); 
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetch the pokemon
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json();
        const pokemonPromises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        });

        const pokemonArray = await Promise.all(pokemonPromises);
        dispatch({ type: "setPokemons", payload: pokemonArray });
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemons();
  }, []);

  // Loading user data and their favorite Pokemon
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user._id) return;
      try {
        const response = await axios.get(
          `https://pokemon-battle-game.onrender.com/api/v1/users/${user._id}`
        );
        const favoriteIds = response.data.favPokemonIds;
        const favoritePokemonDetails = state.pokemons.filter((p) =>
          favoriteIds.includes(p.id)
        );
        dispatch({ type: "setFavorites", payload: favoritePokemonDetails });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (user) fetchUserData();
  }, [user, state.pokemons]);

  const handleAddToFavorites = async (pokemon) => {
    if (!isAuthenticated || !user || !user._id) { 
      console.error("Please log in to add Pokémon to favorites.");
      return;
    }
    try {
      await axios.put(
        `https://pokemon-battle-game.onrender.com/api/v1/users/${user._id}/add-fav-pokemon`,
        { pokemonId: pokemon.id }
      );
      dispatch({ type: "addToFavorites", payload: pokemon });
    } catch (error) {
      console.error("Error adding Pokémon to favorites:", error);
    }
  };

  const handleRemoveFromFavorites = async (pokemonId) => {
    if (!isAuthenticated || !user || !user._id) { 
      console.error("User is not logged in.");
      return;
    }
    try {
      await axios.put(
        `https://pokemon-battle-game.onrender.com/api/v1/users/${user._id}/remove-fav-pokemon`,
        { pokemonId }
      );
      dispatch({ type: "removeFromFavorites", payload: pokemonId });
    } catch (error) {
      console.error("Error removing Pokémon from favorites:", error);
    }
  };

  return (
    <pokemonContext.Provider
      value={{
        ...state,
        dispatch,
        handleAddToFavorites,
        handleRemoveFromFavorites,
      }}
    >
      {children}
    </pokemonContext.Provider>
  );
}
function usePokemon() {
  const context = useContext(pokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
}

export { PokemonProvider, usePokemon };