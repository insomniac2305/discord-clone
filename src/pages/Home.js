import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import HomeBgMain from "../assets/home-bg-main.svg";
import HomeBgLeft from "../assets/home-bg-left.svg";
import HomeBgRight from "../assets/home-bg-right.svg";

function Home() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#404eed] text-white text-base relative flex-1">
        <div>
          <header>
            <nav>
              <Link aria-label="Home" to="/">
                <Logo />
              </Link>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </nav>
          </header>
        </div>
        <div>
          <div>
            <h1 className="font-headline text-2xl">Imagine a Place&nbsp;…</h1>
            <div>
              ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and
              a handful of friends can spend time together. A place that makes it easy to talk every day and hang out
              more often.
            </div>
          </div>
          <div>
            <a href="https://discord.com/">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path d="M17.707 10.708L16.293 9.29398L13 12.587V2.00098H11V12.587L7.70697 9.29398L6.29297 10.708L12 16.415L17.707 10.708Z"></path>
                  <path d="M18 18.001V20.001H6V18.001H4V20.001C4 21.103 4.897 22.001 6 22.001H18C19.104 22.001 20 21.103 20 20.001V18.001H18Z"></path>
                </g>
              </svg>
              Get the real discord
            </a>
            <Link to="/app">Open discord clone</Link>
          </div>
        </div>
        <div>
          <img className="absolute top-0 left-0 h-full w-full object-cover" src={HomeBgMain} alt="" />
          <img className="absolute bottom-0 left-0 -ml-20 md:hidden lg:block" src={HomeBgLeft} alt="" />
          <img className="absolute bottom-0 right-0 -mr-20 hidden md:block" src={HomeBgRight} alt="" />
        </div>
      </div>
      <div role="navigation">
        <div>
          <a href="https://github.com/insomniac2305" title="insomniac2305 on Github">
            Github Link
          </a>
        </div>
        <div>
          <a aria-label="Home" href="/">
            <Logo />
          </a>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
