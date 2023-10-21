import { createContext } from "react";

const AuthContext = createContext({
  user: undefined,
  token: undefined,
  setUser: () => {},
  setToken: () => {},
});

export default AuthContext;
