import { BrowserRouter, Routes, Route } from "react-router-dom";

import Details from "./pages/Details";
import HomePage from "./pages/HomePage";
import Favorites from "./pages/Favorites";
import BattlePage from "./pages/BattlePage";
import { PokemonProvider } from "./contexts/PokemonContext";
import { AuthUserProvider } from "./contexts/AuthUserContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  return (
    <AuthUserProvider>
      <PokemonProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/battle"
              element={
                <ProtectedRoute>
                  <BattlePage />
                </ProtectedRoute>
              }
            />
            <Route path="/pokemon/:id" element={<Details />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Routes>
        </BrowserRouter>
      </PokemonProvider>
    </AuthUserProvider>
  );
}

export default App;
