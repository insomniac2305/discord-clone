import { useNavigate, useParams } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { LogoNoText } from "./Logo";
import { HiOutlinePlus, HiVolumeUp } from "react-icons/hi";
import { FaHashtag } from "react-icons/fa";

function Sidebar({ onNewServer, show, toggle }) {
  const navigate = useNavigate();
  let { serverId } = useParams();

  return (
    <div
      className={
        "flex w-fit -translate-x-[0rem] transition-all " + (show ? "-translate-x-[0rem]" : "-translate-x-[20rem]")
      }
    >
      <nav className="flex min-w-[4.5rem] flex-col items-center gap-2 bg-gray-900 py-3">
        <SidebarItem popupText="Home" onClick={() => navigate("/app")} active={!serverId}>
          <div
            className={
              "flex h-full w-full items-center justify-center text-white hover:bg-blurple-400 " +
              (!serverId ? "bg-blurple-400" : "bg-gray-700")
            }
          >
            <LogoNoText className="text-3xl" />
          </div>
        </SidebarItem>
        <div className="w-1/2 rounded-full border border-gray-700" />
        <SidebarItem popupText="Server 1" onClick={() => navigate("/app/1")} active={serverId === "1"}>
          <div className="flex h-full w-full items-center justify-center bg-green-400">S1</div>
        </SidebarItem>
        <SidebarItem popupText="Server 2" onClick={() => navigate("/app/2")} active={serverId === "2"}>
          <div className="flex h-full w-full items-center justify-center bg-yellow">S2</div>
        </SidebarItem>
        <SidebarItem popupText="Server 3" onClick={() => navigate("/app/3")} active={serverId === "3"}>
          <div className="flex h-full w-full items-center justify-center bg-blue">S3</div>
        </SidebarItem>
        <SidebarItem popupText="New Server" onClick={onNewServer}>
          <div className="flex h-full w-full items-center justify-center bg-gray-700 text-2xl text-green-400 transition-all hover:bg-green-500 hover:text-white">
            <HiOutlinePlus />
          </div>
        </SidebarItem>
      </nav>
      <div className="flex min-w-[15.5rem] flex-col bg-gray-800  text-gray-600">
        <div className="flex h-12 items-center px-4 shadow shadow-black">
          <h1 className="font-bold text-gray-100">Server 1</h1>
        </div>
        <ul className="flex flex-col gap-2 p-4 font-medium">
          <li className="flex items-center gap-2">
            <FaHashtag />
            <span className="text-gray-100">general</span>
          </li>
          <li className="flex items-center gap-2">
            <HiVolumeUp />
            <span>general</span>
          </li>
          <li className="flex items-center gap-2">
            <HiVolumeUp />
            <span>Channel 1</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
