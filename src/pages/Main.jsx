import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import NewServer from "../components/NewServer";
import Sidebar from "../components/Sidebar";
import ChannelHeader from "../components/ChannelHeader";
import { NEWSERVER, MAX_MOBILE_WIDTH } from "../util/Constants";
import useWindowDimensions from "../util/useWindowDimensions";
import useUserServers from "../util/useUserServers";
import useToggle from "../util/useToggle";
import ChannelPlaceholder from "../components/ChannelPlaceholder";
import ChannelContent from "../components/ChannelContent";

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(true);
  const [isMembersVisible, toggleMembersVisible] = useToggle(false);
  const { width } = useWindowDimensions();
  const [servers, channels] = useUserServers(auth.currentUser && auth.currentUser.uid);
  let { serverId, channelId } = useParams();
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || error) {
      navigate("/login");
    }
  }, [user, error, loading, navigate]);

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
        <NewServer onClose={() => setOpenModal(null)} />
      </Modal>
    </div>
  );
}

export default Main;
