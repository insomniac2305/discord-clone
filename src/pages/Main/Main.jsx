import { auth } from "../../firebase";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import ServerForm from "./ServerForm";
import Sidebar from "./Sidebar";
import ChannelHeader from "./ChannelHeader";
import { NEWSERVER, EDITPROFILE, MAX_MOBILE_WIDTH, CHANNEL_TEXT, EDITSERVER } from "../../util/Constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useUserServers from "../../hooks/useUserServers";
import useToggle from "../../hooks/useToggle";
import ChannelPlaceholder from "./ChannelPlaceholder";
import ChannelContent from "./ChannelContent";
import UserForm from "../../components/UserForm";
import { signOut } from "firebase/auth";
import AuthContext from "../../util/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";

function Main() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(true);
  const [isMembersVisible, toggleMembersVisible] = useToggle(false);
  const { width } = useWindowDimensions();
  const [user, userLoading] = useContext(AuthContext);
  const [servers, channels, serversLoading] = useUserServers(user?.uid);
  let { serverId, channelId } = useParams();
  const [currentChannel, setCurrentChannel] = useState(null);
  const [currentServer, setCurrentServer] = useState(null);

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (width >= MAX_MOBILE_WIDTH && !isSidebarVisible) {
      toggleSidebarVisible();
    }
  }, [width]);

  useEffect(() => {
    if (serverId && servers) {
      const serverFromList = servers.find((server) => server.id === serverId);
      setCurrentServer({ ...serverFromList });
    }
  }, [serverId, servers]);

  useEffect(() => {
    if (channels && channelId) {
      const channelFromList = channels.find((channel) => channel.id === channelId);
      setCurrentChannel({ ...channelFromList });
    } else if (serverId && channels && !channelId) {
      const firstTextChannel = channels.find(
        (channel) => channel.serverId === serverId && channel.type === CHANNEL_TEXT
      );
      firstTextChannel && navigate(`/app/${serverId}/${firstTextChannel.id}`);
    } else {
      setCurrentChannel(null);
    }
  }, [serverId, channels, channelId]);

  if (userLoading || serversLoading) {
    return <LoadingScreen loading={true} />;
  } else {
    return (
      <div className="flex h-full w-fit overflow-hidden lg:w-full">
        <Sidebar
          isVisible={isSidebarVisible}
          servers={servers}
          channels={channels}
          currentServer={currentServer}
          onToggle={() => width < MAX_MOBILE_WIDTH && toggleSidebarVisible()}
          onNewServer={() => setOpenModal(NEWSERVER)}
          onEditServer={() => setOpenModal(EDITSERVER)}
          onEditProfile={() => setOpenModal(EDITPROFILE)}
          onSignOut={() => signOut(auth)}
        />
        <div
          className={
            "flex w-screen flex-col bg-gray-700 text-gray-100 transition-transform lg:w-full " +
            (isSidebarVisible ? "-translate-x-[0rem]" : "-translate-x-[20rem]")
          }
        >
          <ChannelHeader
            showSidebarToggle={width < MAX_MOBILE_WIDTH}
            onToggleSidebar={toggleSidebarVisible}
            onToggleMembers={toggleMembersVisible}
            currentChannel={currentChannel}
          />
          {!serverId && <ChannelPlaceholder />}
          {!!serverId && <ChannelContent currentChannel={currentChannel} isMembersVisible={isMembersVisible} />}
        </div>
        <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ServerForm onClose={() => setOpenModal(null)} isNew={true} />
        </Modal>
        <Modal open={openModal === EDITSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <ServerForm
            onClose={() => setOpenModal(null)}
            isNew={false}
            serverId={currentServer?.id}
            currentName={currentServer?.name}
            currentIconUrl={currentServer?.iconUrl}
          />
        </Modal>
        <Modal open={openModal === EDITPROFILE} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
          <UserForm
            isNew={false}
            currentEmail={user?.email}
            currentUsername={user?.displayName}
            currentAvatarUrl={user?.photoURL}
            onSubmit={() => setOpenModal(null)}
          />
        </Modal>
      </div>
    );
  }
}

export default Main;
