import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <p>Login</p>
      <p>
        <Link to="/register">or Register</Link>
      </p>
    </>
  );
}

export default Login;
