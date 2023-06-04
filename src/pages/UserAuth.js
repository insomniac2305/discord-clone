import Login from "../components/Login.js";
import Register from "../components/Register.js";
import { LOGIN, REGISTER } from "../util/Constants.js";
import AuthBackground from "../components/AuthBackground.js";

function UserAuth(props) {
  return (
    <>
      <div className="absolute -bottom-0 -right-0 left-0 top-0 -z-10">
        <AuthBackground />
      </div>
      <div className="flex h-full w-full sm:items-center sm:justify-center">
        {props.mode === LOGIN && <Login />}
        {props.mode === REGISTER && <Register />}
      </div>
    </>
  );
}

export default UserAuth;
