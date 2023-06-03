import Login from "../components/Login.js";
import Register from "../components/Register.js";

function UserAuth(props) {
  return (
    <>
      <Login />
      <div>{props.mode}</div>
    </>
  );
}

export default UserAuth;
