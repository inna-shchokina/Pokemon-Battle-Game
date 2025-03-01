import { useState, useEffect } from "react";

import axios from "axios";


import { useAuth } from "../contexts/AuthUserContext";


function LoginPopup({ onClose }) {
  const [username, setUsername] = useState("");
  const [isPopupInitialized, setIsPopupInitialized] = useState(false);
  const { dispatch, user } = useAuth();

  useEffect(() => {
    if (!user && !isPopupInitialized) {
      dispatch({ type: "toggleLoginPopup" }); 
      setIsPopupInitialized(true);
    }
  }, [user, dispatch, isPopupInitialized]);

  useEffect(() => {
    if (user && user._id) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${user._id}/favorites`
          );
          dispatch({ type: "setFavorites", payload: response.data });
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites(); 
    }
  }, [user, dispatch]);

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`
      );
      if (response.status !== 200) {
        alert(`Error: ${response.data.message || "Could not fetch users."}`);
        return;
      }

      const users = response.data;
    console.log("Fetched users:", users);

    const foundUser = users.find((user) => user.userName === username);

    if (foundUser) {
      console.log("Found user:", foundUser);
      dispatch({ type: "setUser", payload: foundUser });
      onClose();
    } else {
      alert("User not found");
    }
  } catch (error) {
    console.error("Error trying to login:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      alert(
        `Server Error: ${
          error.response.data.message || "Unable to fetch users."
        }`
      );
    } else if (error.request) {
      console.error("Request error:", error.request);
      alert("No response from the server. Check your API endpoint.");
    } else {
      console.error("Error message:", error.message);
      alert("An unexpected error occurred.");
    }
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[500px] h-[250px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-normal text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl text-gray-800 font-semibold mb-6">
          Enter your username
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border rounded-md p-3 w-full mb-6"
        />
        <button
          onClick={handleLogin}
          className="bg-purple-500 text-white px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginPopup;
