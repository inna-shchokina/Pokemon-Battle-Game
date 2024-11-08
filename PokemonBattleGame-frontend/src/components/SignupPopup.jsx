import axios from "axios";
import { useReducer } from "react";

const initialState = { firstName: "", lastName: "", userName: "", country: "" };
function reducer(state, action) {
  switch (action.type) {
    case "setFirstName":
      return { ...state, firstName: action.payload };
    case "setLastName":
      return { ...state, lastName: action.payload };
    case "setUserName":
      return { ...state, userName: action.payload };
    case "setCountry":
      return { ...state, country: action.payload };
    default:
      return state;
  }
}

function SignupPopup({ onClose }) {
  const [{ firstName, lastName, userName, country }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = { firstName, lastName, userName, country };
    try {
      await axios.post(
        "https://pokemon-battle-game.onrender.com/api/v1/users",
        newUser
      );
      onClose();
    } catch (error) {
      throw new Error("can not create a new user");
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[500px]">
        <button
          className="absolute top-4 right-4 text-3xl font-normal text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <form className="" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-gray-800 font-semibold mb-6">
            Enter your name
          </h2>
          <input
            type="text"
            value={firstName}
            onChange={(e) =>
              dispatch({ type: "setFirstName", payload: e.target.value })
            }
            placeholder="First Name"
            className="border rounded-md p-3 w-full mb-6"
          />
          <h2 className="text-2xl text-gray-800 font-semibold mb-6">
            Enter your lastname
          </h2>
          <input
            type="text"
            value={lastName}
            onChange={(e) =>
              dispatch({ type: "setLastName", payload: e.target.value })
            }
            placeholder="Last Name"
            className="border rounded-md p-3 w-full mb-6"
          />
          <h2 className="text-2xl text-gray-800 font-semibold mb-6">
            Enter your username
          </h2>
          <input
            type="text"
            value={userName}
            onChange={(e) =>
              dispatch({ type: "setUserName", payload: e.target.value })
            }
            placeholder="Username"
            className="border rounded-md p-3 w-full mb-6"
          />
          <h2 className="text-2xl text-gray-800 font-semibold mb-6">
            Enter your country
          </h2>
          <input
            type="text"
            value={country}
            onChange={(e) =>
              dispatch({ type: "setCountry", payload: e.target.value })
            }
            placeholder="Country"
            className="border rounded-md p-3 w-full mb-6"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPopup;
