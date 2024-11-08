import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import { usePokemon } from "../contexts/PokemonContext";
import LoginPopup from "../components/LoginPopup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";

function HomePage() {
  const { pokemons } = usePokemon();
  const { isLoginPopupVisible, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (pokemonId) => {
    navigate(`/pokemon/${pokemonId}`);
  };
  const handleClosePopup = () => {
    dispatch({ type: "toggleLoginPopup" });
  };
  return (
    <div>
      <Header />
      {isLoginPopupVisible && <LoginPopup onClose={handleClosePopup} />}

      <main className="min-h-screen p-8 flex flex-col items-center py-[3rem] px-[5rem]">
      <h1 className="text-3xl text-white mb-6">Welcome to Pokémon Battle!</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {pokemons.map((pokemon) => (
    <PokemonCard
      img={pokemon.sprites.front_default}
      key={pokemon.name}
      name={pokemon.name}
      onClick={() => handleCardClick(pokemon.id)}
    />
  ))}
</div>

      </main>
    </div>
  );
}

export default HomePage;
