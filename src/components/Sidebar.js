import { useNavigate, useParams } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { LogoNoText } from "./Logo";
import { HiOutlinePlus } from "react-icons/hi";

function Sidebar({ onNewServer }) {
  const navigate = useNavigate();
  let { serverId } = useParams();

  return (
    <nav className="flex min-w-[4.5rem]  flex-col items-center gap-2 bg-gray-900 py-3">
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

      <div className="w-1/2 rounded-full border border-gray-600" />

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
  );
}

export default Sidebar;
