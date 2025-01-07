import { useEffect, useState } from "react";
import Header from "../components/Header";

function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchLeaderBoard() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/leaderboards`
        );
        const data = await res.json();
        setLeaderBoard(data);

        // Fetch each user's data in parallel
        const usersPromises = data.map(async (user) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user.userId}`
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
      <div className="flex justify-center items-center ">
      <main className="py-[3rem] justify-center items-center px-[5rem]">
        <h1 className="text-3xl text-center  text-white  -mb-2">Leaderboard</h1>
        <div className="leaderboard mt-[2rem]">
          {users.map((user, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center text-lg border-2 bg-white rounded-lg p-6 justify-between mb-4 mx-auto w-[500px]"
            >
              <div className="flex items-center gap-[2rem]">
                <span className="p-[8px] w-[40px] h-[40px] bg-[#F3C007] rounded-full font-semibold text-white text-center">
                  {i + 1}
                </span>
                <p>{user.userName}</p>
              </div>

              <p className="font-semibold">{leaderBoard[i].score}</p>
            </div>
          ))}
        </div>
      </main>
      </div>
    </>
  );
}

export default LeaderBoard;
