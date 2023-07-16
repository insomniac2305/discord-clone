import React from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import UserAuth from "./pages/UserAuth/UserAuth";
import { LOGIN, REGISTER } from "./util/Constants";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthContext from "./util/AuthContext";
import JoinServer from "./pages/JoinServer/JoinServer";

function App() {
  const [user, loading, error] = useAuthState(auth);

  const redirectIfSignedIn = () => {
    if (user) {
      return redirect("/app");
    } else {
      return null;
    }
  };

  const redirectIfSignedOut = () => {
    if (!user || error || loading) {
      return redirect("/login");
    } else {
      return null;
    }
  };

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/app",
      children: [
        { index: true, element: <Main /> },
        { path: ":serverId", element: <Main /> },
        { path: ":serverId/:channelId", element: <Main /> },
      ],
      loader: redirectIfSignedOut,
    },
    {
      path: "/login",
      element: <UserAuth mode={LOGIN} />,
      loader: redirectIfSignedIn,
    },
    { path: "/register", element: <UserAuth mode={REGISTER} />, loader: redirectIfSignedIn },
    { path: "/join/:serverId", element: <JoinServer />}
  ]);

  return (
    <AuthContext.Provider value={user}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
