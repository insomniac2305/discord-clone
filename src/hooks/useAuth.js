import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import useBackendRequest from "./useBackendRequest";

function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useLocalStorage("token");
  const [authLoading, setAuthLoading] = useState(true);
  const [requestUser, userData, , userError] = useBackendRequest("api/users/me");

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        await requestUser(token);
      } else {
        setAuthLoading(false);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    if (userData || userError) {
      setUser(userData || undefined);
      setAuthLoading(false);
      if (userError) {
        setToken(undefined);
      }
    }
  }, [userData, userError]);

  return [user, setUser, token, setToken, authLoading];
}

export default useAuth;
