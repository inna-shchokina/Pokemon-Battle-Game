import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import axios from "axios";
import Header from "../components/Header";
import { usePokemon } from "../contexts/PokemonContext";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pokemons, favorites, handleAddToFavorites } = usePokemon();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (pokemons.length > 0) {
            const selectedPokemon = pokemons.find((p) => p.id === parseInt(id));
            if (selectedPokemon) {
                setPokemon(selectedPokemon);
            } else {
                console.error("Pokemon not found in the list.");
            }
        }
    }, [id, pokemons]);

    if (!pokemon) return <p>Loading...</p>;

    const handleAdd = () => {
        if (!favorites.some((fav) => fav.id === pokemon.id)) {
            handleAddToFavorites(pokemon);
            navigate("/favorites");
        } else {
            alert("This Pokémon is already in your favorites.");
        }
    };
    
    return (
        <div>
            <Header />
            <div className="min-h-screen p-8 flex flex-col items-center">
                <div className="w-full flex justify-center">
                    <h1 className="text-3xl text-white mb-6 mt-4 text-center">
                        {pokemon.name} [{pokemon.id}]
                    </h1>
                </div>
                <div className="w-full md:max-w-5xl bg-white rounded-lg shadow-lg p-6 flex flex-col sm:max-w-6xl md:ml-12 md:mr-12 md:flex-row items-center md:justify-between relative">
                    {/* Left column */}
                    <div className="flex flex-col items-center text-center ml-auto sm:ml-0 md:ml-14">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="w-44 h-44"
                        />
                        <p className="font-semibold text-gray-800">
                            {pokemon.types.map((type) => type.type.name).join(" · ")}
                        </p>
                        <p className="text-gray-600 font-semibold mt-2">
                            H–[{pokemon.height / 10} m] W–[{pokemon.weight / 10} kg]
                        </p>
                    </div>
                    {/* Divider */}
                    <div className="hidden md:block h-48 border-l border-gray-300 mx-6"></div>
                    {/* Right column */}
                    <div className="mt-6 md:mt-4 sm:mr-0 md:mr-14 md:w-1/2">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name} className="flex items-center mb-4">
                                <span className="w-56 mr-2 text-gray-800 font-semibold capitalize text-right">
                                    {stat.stat.name}
                                </span>
                                <span className="w-12 text-gray-700 text-right">
                                    {stat.base_stat}
                                </span>
                                <div className="w-full bg-gray-200 rounded-full h-3 mx-2">
                                    <div
                                        className="bg-blue-500 h-3 rounded-full"
                                        style={{ width: `${(stat.base_stat / 150) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Btn */}
                <div className="w-full flex justify-center">
                    <button
                        onClick={handleAdd}
                        className="mt-8 sm:ml-0 md:ml-12 px-4 py-2 bg-gray-800 text-white rounded shadow hover:bg-gray-700"
                    >
                        Add to Favorites
                    </button> 
                </div>
            </div>
        </div>
    );
};

export default Details;