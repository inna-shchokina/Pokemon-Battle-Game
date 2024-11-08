import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthUserContext";
import { usePokemon } from "../contexts/PokemonContext";

const systemId = "672b55a839572d7d3f7a7127";
function Battle({
  pokemonUser,
  pokemonSystem,
  setPokemonSystem,
  setPokemonUser,
}) {
  const [userScore, setUserScore] = useState(0);
  const [systemScore, setSystemScore] = useState(0);
  const [message, setMessage] = useState("");
  const [hasFight, setHasFight] = useState(false);

  const { user } = useAuth();
  const { pokemons } = usePokemon();
  async function sendBattleOutcomeToApi(playerRed, playerBlue) {
    try {
      await axios.post(
        "https://pokemon-battle-game.onrender.com/api/v1/battle-outcomes",
        { playerRed, playerBlue }
      );
    } catch (error) {
      throw new Error("there was an error posting data to api");
    }
  }
  function handleFight() {
    if (!pokemonUser.name || !pokemonSystem.name) return;

    let updatedUserScore = userScore;
    let updatedSystemScore = systemScore;

    if (pokemonUser.base_stat > pokemonSystem.stats[0].base_stat) {
      setMessage("You Win!");
      updatedUserScore += 250;
      updatedSystemScore = Math.max(0, updatedSystemScore - 50);
    } else if (pokemonUser.base_stat < pokemonSystem.stats[0].base_stat) {
      setMessage("You Lose!");
      updatedUserScore = Math.max(0, updatedUserScore - 50);
      updatedSystemScore += 250;
    } else {
      setMessage("It was a Tie!");
      updatedUserScore += 100;
      updatedSystemScore += 100;
    }

    setUserScore(updatedUserScore);
    setSystemScore(updatedSystemScore);

    const playerRed = {
      userId: user._id,
      score: updatedUserScore,
    };
    const playerBlue = {
      userId: systemId,
      score: updatedSystemScore,
    };

    sendBattleOutcomeToApi(playerRed, playerBlue);

    setHasFight(true);
  }

  function handleReset() {
    const randomId = Math.floor(Math.random() * pokemons.length);
    setPokemonSystem(pokemons[randomId]);
    setPokemonUser({});
    setHasFight(false);
    setSystemScore(0);
    setUserScore(0);
  }
  return (
    <>
      <h1 className="text-[1.4rem] text-white">Our Battle</h1>
      <div className="bg-white w-[60%] rounded-[10px] mt-[3rem] mx-auto p-[5rem] flex flex-col justify-center items-center gap-[2rem]">
        <div className="w-full flex justify-around items-center">
          <div className="w-[15rem] h-[15rem] p-[3rem] flex flex-col items-center border-2">
            <h3>{pokemonUser.name || "Your Pokémon"}</h3>
            <span className="font-thin mb-[1rem]">(You)</span>
            {pokemonUser.img && (
              <img src={pokemonUser.img} alt={pokemonUser.name} />
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-[1rem]">
            <div className="w-[0.5px] h-[7rem] bg-black"></div>
            <img src="/images/icons8-bolt-64.png" alt="bolt icon" />
            <div className="w-[0.5px] h-[7rem] bg-black"></div>
          </div>
          <div className="w-[15rem] h-[15rem] p-[3rem] flex flex-col items-center border-2">
            <h3>{pokemonSystem?.name || "System Pokémon"}</h3>
            <span className="font-thin mb-[1rem]">(System)</span>
            {pokemonSystem?.sprites?.front_default && (
              <img
                src={pokemonSystem.sprites.front_default}
                alt={pokemonSystem.name}
              />
            )}
          </div>
        </div>
        <button
          className="fightBtn bg-black text-white text-[1.2rem] py-[1rem] px-[2rem] rounded-md w-[16rem]"
          onClick={handleFight}
          disabled={hasFight}
        >
          Fight!
        </button>
        <button
          className="fightBtn bg-black text-white text-[1.2rem] py-[1rem] px-[2rem] rounded-md w-[16rem]"
          onClick={handleReset}
        >
          Reset
        </button>
        <div>{message}</div>
        <div>{userScore}</div>
      </div>
    </>
  );
}

export default Battle;
