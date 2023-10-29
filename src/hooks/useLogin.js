import { useContext, useEffect } from "react";
import useBackendRequest from "./useBackendRequest";
import AuthContext from "../util/AuthContext";

function useLogin() {
  const [requestLogin, loginData, loginLoading, loginError] = useBackendRequest("login");
  const {setUser, setToken} = useContext(AuthContext);

  useEffect(() => {
    if (loginData) {
      setUser(loginData.user);
      setToken(loginData.token);
    }
  }, [loginData]);

  const submitLogin = async (email, password) => await requestLogin(null, "POST", { email, password });

  return [submitLogin, loginData, loginLoading, loginError];
}

export default useLogin;
