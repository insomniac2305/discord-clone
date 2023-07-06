import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import UserAuth from "./pages/UserAuth/UserAuth";
import { LOGIN, REGISTER } from "./util/Constants";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/app",
    children: [
      { index: true, element: <Main /> },
      { path: ":serverId", element: <Main /> },
      { path: ":serverId/:channelId", element: <Main /> },
    ],
  },
  { path: "/login", element: <UserAuth mode={LOGIN} /> },
  { path: "/register", element: <UserAuth mode={REGISTER} /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
