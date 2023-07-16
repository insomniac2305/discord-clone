import { auth } from "../../firebase";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import ServerForm from "./ServerForm";
import Sidebar from "./Sidebar";
import ChannelHeader from "./ChannelHeader";
import { NEWSERVER, EDITPROFILE, MAX_MOBILE_WIDTH } from "../../util/Constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useUserServers from "../../hooks/useUserServers";
import useToggle from "../../hooks/useToggle";
import ChannelPlaceholder from "./ChannelPlaceholder";
import ChannelContent from "./ChannelContent";
import UserForm from "../../components/UserForm";
import { signOut } from "firebase/auth";
import AuthContext from "../../util/AuthContext";

function Main() {
  const [openModal, setOpenModal] = useState(null);
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(true);
  const [isMembersVisible, toggleMembersVisible] = useToggle(false);
  const { width } = useWindowDimensions();
  const [servers, channels] = useUserServers(auth.currentUser && auth.currentUser.uid);
  let { serverId, channelId } = useParams();
  const [currentChannel, setCurrentChannel] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (width >= MAX_MOBILE_WIDTH && !isSidebarVisible) {
      toggleSidebarVisible();
    }
  }, [width]);

  useEffect(() => {
    if (channels && channelId) {
      const channelFromList = channels.find((channel) => channel.id === channelId);
      setCurrentChannel({ ...channelFromList });
    } else {
      setCurrentChannel(null);
    }
  }, [channels, channelId]);

  return (
    <div className="flex h-full w-fit overflow-hidden lg:w-full">
      <Sidebar
        onNewServer={() => setOpenModal(NEWSERVER)}
        isVisible={isSidebarVisible}
        onToggle={() => width < MAX_MOBILE_WIDTH && toggleSidebarVisible()}
        servers={servers}
        channels={channels}
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
        <ServerForm onClose={() => setOpenModal(null)} />
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

export default Main;
