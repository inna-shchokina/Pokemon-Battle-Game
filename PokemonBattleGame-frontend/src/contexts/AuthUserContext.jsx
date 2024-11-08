import { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  isLoginPopupVisible: false,
  isAuthenticated: false,
  isSignupPopupVisible: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "toggleLoginPopup":
      return { ...state, isLoginPopupVisible: !state.isLoginPopupVisible };
    case "logout":
      return { ...initialState };
    case "toggleSignUpPopup":
      return { ...state, isSignupPopupVisible: !state.isSignupPopupVisible };
    default:
      return state;
  }
}
const AuthUserContext = createContext();
function AuthUserProvider({ children }) {
  const [
    { user, isLoginPopupVisible, isAuthenticated, isSignupPopupVisible },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log(isLoginPopupVisible);
  return (
    <AuthUserContext.Provider
      value={{
        user,
        isLoginPopupVisible,
        isAuthenticated,
        dispatch,
        isSignupPopupVisible,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthUserContext);
  if (context === undefined)
    throw new Error("provider was used outside of the context");
  return context;
}
export { AuthUserProvider, useAuth };
