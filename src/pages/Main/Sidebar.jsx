import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { LogoNoText } from "../../components/Logo";
import { HiChevronDown, HiCog, HiOutlinePlus, HiPlusCircle, HiUserAdd } from "react-icons/hi";
import calculateColor from "../../util/CalculateColor";
import ChannelItem from "./ChannelItem";
import CurrentUserInfo from "./CurrentUserInfo";
import PopupMenu from "../../components/PopupMenu";

function Sidebar({
  onNewServer,
  isVisible,
  servers,
  channels,
  onToggle,
  onEditProfile,
  onSignOut,
  onEditServer,
  onOpenServerInvite,
  currentServer,
  onNewChannel,
  onEditChannel,
}) {
  const navigate = useNavigate();
  let { serverId, channelId } = useParams();
  const [heading, setHeading] = useState("");
  const sidebarRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (serverId) {
      if (currentServer) {
        setHeading(currentServer.name);
      } else {
        setHeading("");
      }
    } else {
      setHeading("Friends");
    }
  }, [serverId, currentServer]);

  let serverList;

  if (servers) {
    serverList = servers.map((server) => {
      let backgroundStyle;
      if (server.iconUrl) {
        backgroundStyle = {
          backgroundImage: `url(${server.iconUrl})`,
        };
      } else {
        const colors = calculateColor(server.name);
        backgroundStyle = {
          backgroundColor: colors.background,
          color: colors.text,
        };
      }

      return (
        <SidebarItem
          key={server.id}
          popupText={server.name}
          onClick={() => navigate(`/app/${server.id}`)}
          active={serverId === server.id}
        >
          <div
            className="flex h-full w-full items-center justify-center bg-cover bg-center font-bold"
            style={backgroundStyle}
          >
            {!server.iconUrl && server.name.charAt(0)}
          </div>
        </SidebarItem>
      );
    });
  }

  let channelList;

  if (channels) {
    const serverChannels = channels.filter((channel) => channel.serverId === serverId);
    channelList = serverChannels.map((channel) => {
      return (
        <ChannelItem
          key={channel.id}
          type={channel.type}
          name={channel.name}
          active={channel.id === channelId}
          linkTo={`/app/${channel.serverId}/${channel.id}`}
          onClick={onToggle}
          onEdit={() => onEditChannel(channel)}
        />
      );
    });
  }

  return (
    <div
      ref={sidebarRef}
      className={"flex w-fit transition-all " + (isVisible ? "-translate-x-[0rem]" : "-translate-x-[20rem]")}
    >
      <nav className="flex w-[4.5rem] flex-col items-center gap-2 bg-gray-900 py-3">
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

        {serverList}

        <SidebarItem popupText="New Server" onClick={onNewServer}>
          <div className="flex h-full w-full items-center justify-center bg-gray-700 text-2xl text-green-400 transition-all hover:bg-green-500 hover:text-white">
            <HiOutlinePlus />
          </div>
        </SidebarItem>
      </nav>
      <div className="flex w-[15.5rem] flex-col bg-gray-800  text-gray-600">
        <div className="relative h-12 shadow shadow-black">
          <button
            ref={btnRef}
            className={
              "flex h-full w-full items-center px-4 text-start " +
              (serverId ? "hover:bg-gray-680 focus:bg-gray-680" : "hover:cursor-default")
            }
          >
            <h1 className="flex-1 font-bold text-gray-100">{heading}</h1>
            {!!serverId && <HiChevronDown className="text-xl text-gray-100" />}
          </button>
          {!!serverId && (
            <PopupMenu clickTarget={btnRef.current} popupBoundary={sidebarRef.current} top={55} left={12}>
              <ul className="w-52 text-xs font-bold text-gray-500">
                <li className="w-full">
                  <button
                    onClick={onOpenServerInvite}
                    className="flex w-full items-center justify-between rounded p-2 text-start tracking-wide hover:bg-blurple-500 hover:text-white active:bg-blurple-600"
                  >
                    <span>Invite People</span>
                    <span>
                      <HiUserAdd className="text-lg" />
                    </span>
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={onNewChannel}
                    className="flex w-full items-center justify-between rounded p-2 text-start tracking-wide hover:bg-blurple-500 hover:text-white active:bg-blurple-600"
                  >
                    <span>Add Channel</span>
                    <span>
                      <HiPlusCircle className="text-lg" />
                    </span>
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={onEditServer}
                    className="flex w-full items-center justify-between rounded p-2 text-start tracking-wide hover:bg-blurple-500 hover:text-white active:bg-blurple-600"
                  >
                    <span>Edit Server</span>
                    <span>
                      <HiCog className="text-lg" />
                    </span>
                  </button>
                </li>
              </ul>
            </PopupMenu>
          )}
        </div>
        <ul className="flex flex-1 flex-col px-2 py-4 font-medium">{channelList}</ul>
        <CurrentUserInfo onEditProfile={onEditProfile} onSignOut={onSignOut} />
      </div>
    </div>
  );
}

export default Sidebar;
