import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

function Header() {
  const {
    user,
    isLoginPopupVisible,
    dispatch,
    isAuthenticated,
    isSignupPopupVisible,
  } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch({ type: "toggleLoginPopup" });
  };

  const handleClosePopup = () => {
    dispatch({ type: "toggleLoginPopup" });
  };

  const handleSignUpClick = () => {
    dispatch({ type: "toggleSignUpPopup" });
  };

  const handleCloseSignUp = () => {
    dispatch({ type: "toggleSignUpPopup" });
  };

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  return (
    <header className="header flex py-[2rem] px-[5rem] items-center bg-white">
      <div className="logo mr-auto">Pokemon</div>

      <nav className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex gap-[2rem] items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">My Favorites</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>

      <div className="flex gap-[2rem] mr-[2rem]">
        {user && (
          <div className="text-center">
            <span className="text-gray-800 font-semibold mr-4">
              {user.firstName}
            </span>
          </div>
        )}

        {isAuthenticated ? (
          <button
            className="text-gray-800 font-medium mr-4"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-gray-800 font-medium mr-4"
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <Link
            to="/battle"
            className="bg-[#9B44E5] text-white rounded-[6px] py-[8px] px-[14px]"
          >
            Let's Fight!
          </Link>
        ) : (
          <button
            onClick={handleSignUpClick}
            className="bg-[#9B44E5] text-white rounded-[6px] py-[8px] px-[14px]"
          >
            Signup to Fight!
          </button>
        )}
      </div>

      {isLoginPopupVisible && (
        <div className="login-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-content bg-white p-6 rounded shadow-lg">
            <LoginPopup onClose={handleClosePopup} />
          </div>
        </div>
      )}

      {isSignupPopupVisible && (
        <div className="login-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-content bg-white p-6 rounded shadow-lg">
            <SignupPopup onClose={handleCloseSignUp} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
