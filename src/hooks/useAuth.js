import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import useBackendRequest from "./useBackendRequest";

function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useLocalStorage("token");
  const [requestUser, userData, userLoading, userError] = useBackendRequest("api/users/me");

  useEffect(() => {
    if (token) {
      requestUser(token);
    }
  }, []);

  useEffect(() => {
    if (userData && !userError && !userLoading) {
      setUser(userData);
    } else if (userError) {
      setUser(undefined);
      setToken(undefined);
    }
  }, [userData, userError, userLoading]);

  return [user, setUser, token, setToken, userLoading];
}

export default useAuth;
