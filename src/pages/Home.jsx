import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Logo from "../components/Logo";
import HomeBgMain from "../assets/home-bg-main.svg";
import HomeBgLeft from "../assets/home-bg-left.svg";
import HomeBgRight from "../assets/home-bg-right.svg";

function Home() {
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden bg-[#404eed] text-base text-white">
        <div className="flex justify-center">
          <nav className="flex items-center justify-between p-4 md:p-8 w-full max-w-screen-xl">
            <Link aria-label="Home" to="/">
              <Logo />
            </Link>
            <Link className="rounded-full bg-white px-4 py-2 align-middle text-sm tracking-tight text-black transition-all duration-200 hover:text-blurple-400 hover:shadow-xl" to="/login">
              Login
            </Link>
          </nav>
        </div>
        <div className="flex lg:justify-center">
          <div className="px-4 py-8 md:max-w-[35rem] md:px-8 lg:max-w-screen-md	 lg:text-center">
            <div className="py-4">
              <h1 className="mb-4 font-headline text-2xl md:text-6xl lg:my-8">Imagine a Place&nbsp;…</h1>
              <div className="mb-4 md:text-xl">
                ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you
                and a handful of friends can spend time together. A place that makes it easy to talk every day and hang
                out more often.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:justify-center">
              <a
                className="z-10 box-content flex h-6 shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-all duration-200 hover:text-blurple-400 hover:shadow-xl"
                href="https://discord.com/"
              >
                <FaExternalLinkAlt/>
                Go to real Discord
              </a>
              <Link
                className="z-10 box-content flex h-6 shrink-0 items-center rounded-full bg-black px-8 py-4 text-lg font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-xl"
                to="/app"
              >
                Open Discord clone
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img className="absolute bottom-0 left-0 h-4/5 w-full object-cover" src={HomeBgMain} alt="" />
          <img
            className="absolute bottom-0 left-0 -ml-20 md:hidden lg:left-1/2 lg:-ml-[54rem] lg:block"
            src={HomeBgLeft}
            alt=""
          />
          <img
            className="absolute bottom-0 right-0 -mr-20 hidden md:block lg:left-1/2 lg:ml-[16rem]"
            src={HomeBgRight}
            alt=""
          />
        </div>
      </div>
      <div className="bg-black p-4 text-white flex items-center flex-col" role="navigation">
        <div className="flex items-center justify-between border-b border-b-blurple-400 pb-4 w-full max-w-screen-xl">
          <a aria-label="Home" href="/">
            <Logo />
          </a>
          <Link className="rounded-full bg-blurple-400 px-4 py-2 align-middle text-sm tracking-tight transition-all duration-200 hover:brightness-125 hover:shadow-xl" to="/register">
            Register
          </Link>
        </div>
        <div className="mt-4 flex justify-center w-full">
          <a
            href="https://github.com/insomniac2305"
            className="flex items-center gap-2 text-sm"
            title="insomniac2305 on Github"
          >
            <FaGithub className="text-xl" /> built by insomniac2305
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
