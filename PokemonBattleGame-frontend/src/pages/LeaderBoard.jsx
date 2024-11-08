import { useEffect, useState } from "react";
import Header from "../components/Header";

function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchLeaderBoard() {
      try {
        const res = await fetch(
          "https://pokemon-battle-game.onrender.com/api/v1/leaderboards"
        );
        const data = await res.json();
        setLeaderBoard(data);

        // Fetch each user's data in parallel
        const usersPromises = data.map(async (user) => {
          const response = await fetch(
            `https://pokemon-battle-game.onrender.com/api/v1/users/${user.userId}`
          );
          return response.json();
        });

        // Wait for all promises to resolve and set users state once
        const usersArray = await Promise.all(usersPromises);
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching leaderboard or users:", error);
      }
    }
    fetchLeaderBoard();
  }, []);

  console.log(leaderBoard);
  console.log(users);

  return (
    <>
      <Header />
      <main className="py-[3rem] px-[5rem]">
        <h2 className="text-[1.4rem] text-white">Leaderboard</h2>
        <div className="leaderboard mt-[2rem]">
          {users.map((user, i) => (
            <div
              key={i}
              className=" flex w-[30%] bg-white p-[2rem] justify-between items-center mb-[2rem]"
            >
              <div className="flex items-center gap-[2rem]">
                <span className="p-[5px] w-[30px] h-[30px] bg-[#F3C007] text-white text-center">
                  {i + 1}
                </span>
                <p>{user.userName}</p>
              </div>

              <p>{leaderBoard[i].score}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default LeaderBoard;
