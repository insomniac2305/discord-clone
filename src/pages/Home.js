import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/main">Main</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}

export default Home;
