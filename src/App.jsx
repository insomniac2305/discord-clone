import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import { LOGIN, REGISTER } from "./util/Constants";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/app",
    children: [
      { index: true, element: <Main /> },
      { path: ":serverId", element: <Main /> },
    ],
  },
  { path: "/login", element: <UserAuth mode={LOGIN} /> },
  { path: "/register", element: <UserAuth mode={REGISTER} /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
