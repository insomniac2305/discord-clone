import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import UserAuth from "./pages/UserAuth/UserAuth";
import { LOGIN, REGISTER } from "./util/Constants";
import AuthContext from "./util/AuthContext";
import JoinServer from "./pages/JoinServer/JoinServer";
import useAuth from "./hooks/useAuth";

function App() {
  const [user, setUser, token, setToken, authLoading] = useAuth();

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/app",
      element: <Main />,
      children: [
        { path: ":serverId", element: <Main /> },
        { path: ":serverId/:channelId", element: <Main /> },
      ],
    },
    {
      path: "/login",
      element: <UserAuth mode={LOGIN} />,
    },
    { path: "/register", element: <UserAuth mode={REGISTER} /> },
    { path: "/join/:serverId", element: <JoinServer /> },
  ]);

  return (
    <AuthContext.Provider value={[user, token, setUser, setToken, authLoading]}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
