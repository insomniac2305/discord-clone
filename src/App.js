import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main.js";
import Home from "./pages/Home.js";
import UserAuth from "./pages/UserAuth.js";
import {LOGIN , REGISTER} from "./util/Constants.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <Main />,
  },
  {
    path: "/login",
    element: <UserAuth mode={LOGIN} />,
  },
  {
    path: "/register",
    element: <UserAuth mode={REGISTER} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
