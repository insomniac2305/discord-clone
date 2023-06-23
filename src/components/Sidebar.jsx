import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { LogoNoText } from "./Logo";
import { HiOutlinePlus } from "react-icons/hi";
import calculateColor from "../util/CalculateColor";
import ChannelItem from "./ChannelItem";
import { CHANNEL_TEXT } from "../util/Constants";

function Sidebar({ onNewServer, isVisible, servers, channels, onToggle }) {
  const navigate = useNavigate();
  let { serverId, channelId } = useParams();
  const [heading, setHeading] = useState("");

  useEffect(() => {
    if (serverId) {
      if (servers) {
        const currentServer = servers.find((server) => server.id === serverId);
        currentServer && setHeading(currentServer.name);
      } else {
        setHeading("");
      }
    } else {
      setHeading("Friends");
    }
  });

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
      let firstTextChannel;
      if (channels) {
        firstTextChannel = channels.find((channel) => channel.serverId === server.id && channel.type === CHANNEL_TEXT);
      }

      return (
        <SidebarItem
          key={server.id}
          popupText={server.name}
          onClick={() => navigate(`/app/${server.id}/${firstTextChannel.id}`)}
          active={serverId === server.id}
        >
          <div className="flex h-full w-full items-center justify-center bg-cover font-bold" style={backgroundStyle}>
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
        />
      );
    });
  }

  return (
    <div
      className={
        "flex w-fit transition-all " + (isVisible ? "-translate-x-[0rem]" : "-translate-x-[20rem]")
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

        {serverList}

        <SidebarItem popupText="New Server" onClick={onNewServer}>
          <div className="flex h-full w-full items-center justify-center bg-gray-700 text-2xl text-green-400 transition-all hover:bg-green-500 hover:text-white">
            <HiOutlinePlus />
          </div>
        </SidebarItem>
      </nav>
      <div className="flex min-w-[15.5rem] flex-col bg-gray-800  text-gray-600">
        <div className="flex h-12 items-center px-4 shadow shadow-black">
          <h1 className="font-bold text-gray-100">{heading}</h1>
        </div>
        <ul className="flex flex-col px-2 py-4 font-medium">{channelList}</ul>
      </div>
    </div>
  );
}

export default Sidebar;
