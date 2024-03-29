import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import ServerForm from "./ServerForm";
import Sidebar from "./Sidebar";
import ChannelHeader from "./ChannelHeader";
import {
  NEWSERVER,
  EDITPROFILE,
  MAX_MOBILE_WIDTH,
  CHANNEL_TEXT,
  EDITSERVER,
  SERVERINVITE,
  NEWCHANNEL,
  EDITCHANNEL,
} from "../../util/Constants";
import useToggle from "../../hooks/useToggle";
import ChannelPlaceholder from "./ChannelPlaceholder";
import ChannelContent from "./ChannelContent";
import UserForm from "../../components/UserForm";
import AuthContext from "../../util/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";
import ServerInvite from "./ServerInvite";
import ChannelForm from "./ChannelForm";
import useBackendRequest from "../../hooks/useBackendRequest";
import useWindowWidthThreshold from "../../hooks/useWindowWidthThreshold";

function Main() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(true);
  const [isMembersVisible, toggleMembersVisible] = useToggle(false);
  const isMobileWidth = useWindowWidthThreshold(MAX_MOBILE_WIDTH);
  const { user, setUser, token, setToken, authLoading } = useContext(AuthContext);
  let { serverId, channelId } = useParams();
  const [requestServers, servers, serversLoading] = useBackendRequest("api/servers");
  const [requestChannels, channels, channelsLoading] = useBackendRequest(
    serverId && `api/servers/${serverId}/channels`
  );
  const [channelToEdit, setChannelToEdit] = useState(null);
  let currentServer;
  let currentChannel;

  useEffect(() => {
    if (!user && !authLoading) {
      navigate("/login");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user && token) {
      requestServers(token);
    }
  }, [user, token]);

  useEffect(() => {
    if (user && token && serverId) {
      requestChannels(token);
    }
  }, [user, token, serverId]);

  useEffect(() => {
    if (serverId && channels && !channelId) {
      const firstTextChannel = channels.find((channel) => channel.type === CHANNEL_TEXT);
      currentServer?.channels?.includes(firstTextChannel?._id) && navigate(`/app/${serverId}/${firstTextChannel._id}`);
    }
  }, [serverId, channels, channelId]);

  useEffect(() => {
    if (!isMobileWidth && !isSidebarVisible) {
      toggleSidebarVisible();
    }
  }, [isMobileWidth]);

  if (serverId && servers) {
    const serverFromList = servers.find((server) => server._id === serverId);
    currentServer = { ...serverFromList };
  }

  if (channelId && channels) {
    const channelFromList = channels.find((channel) => channel._id === channelId);
    currentChannel = { ...channelFromList };
  } else {
    currentChannel = undefined;
  }

  if (authLoading || serversLoading) {
    return <LoadingScreen loading={true} />;
  } else {
    return (
      <div className="flex h-full w-fit overflow-hidden lg:w-full">
        <Sidebar
          isVisible={isSidebarVisible}
          servers={servers}
          channels={channels}
          channelsLoading={channelsLoading}
          currentServer={currentServer}
          onToggle={() => isMobileWidth && toggleSidebarVisible()}
          onNewServer={() => setOpenModal(NEWSERVER)}
          onEditServer={() => setOpenModal(EDITSERVER)}
          onNewChannel={() => setOpenModal(NEWCHANNEL)}
          onEditChannel={(channel) => {
            setChannelToEdit(channel);
            setOpenModal(EDITCHANNEL);
          }}
          onEditProfile={() => setOpenModal(EDITPROFILE)}
          onOpenServerInvite={() => setOpenModal(SERVERINVITE)}
          onSignOut={() => {
            setUser(undefined);
            setToken(undefined);
          }}
        />
        <div
          className={
            "flex w-screen flex-col bg-gray-700 text-gray-100 transition-transform lg:w-full " +
            (isSidebarVisible ? "-translate-x-[0rem]" : "-translate-x-[20rem]")
          }
        >
          <ChannelHeader
            showSidebarToggle={isMobileWidth}
            onToggleSidebar={toggleSidebarVisible}
            onToggleMembers={toggleMembersVisible}
            currentChannel={currentChannel}
          />
          {!serverId && <ChannelPlaceholder />}
          {!!serverId && (
            <ChannelContent
              serverId={serverId}
              currentChannel={currentChannel}
              isMembersVisible={isMembersVisible}
              key={currentChannel?._id}
            />
          )}
        </div>
        <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ServerForm
            onClose={() => {
              setOpenModal(null);
              requestServers(token);
            }}
            isNew={true}
          />
        </Modal>
        <Modal open={openModal === EDITSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ServerForm
            onClose={() => {
              setOpenModal(null);
              requestServers(token);
            }}
            isNew={false}
            serverId={currentServer?._id}
            currentName={currentServer?.name}
            currentIconUrl={currentServer?.icon}
          />
        </Modal>
        <Modal open={openModal === NEWCHANNEL} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ChannelForm onClose={() => setOpenModal(null)} isNew={true} serverId={currentServer?._id} />
        </Modal>
        <Modal open={openModal === EDITCHANNEL} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ChannelForm
            onClose={() => {
              setOpenModal(null);
              requestChannels(token);
            }}
            isNew={false}
            serverId={currentServer?._id}
            channelId={channelToEdit?._id}
            currentName={channelToEdit?.name}
            currentType={channelToEdit?.type}
          />
        </Modal>
        <Modal open={openModal === EDITPROFILE} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <UserForm
            isNew={false}
            currentEmail={user?.email}
            currentUsername={user?.name}
            currentAvatarUrl={user?.avatar}
            onSubmit={() => setOpenModal(null)}
          />
        </Modal>
        <Modal open={openModal === SERVERINVITE} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ServerInvite serverName={currentServer?.name} serverId={currentServer?._id} />
        </Modal>
      </div>
    );
  }
}

export default Main;
