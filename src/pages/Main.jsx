import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import NewServer from "../components/NewServer";
import { NEWSERVER } from "../util/Constants";
import useWindowDimensions from "../util/WindowDimensions";
import Sidebar from "../components/Sidebar";
import MainBg from "../assets/main-bg.svg";
import { HiMenu } from "react-icons/hi";
import { FaHashtag } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const { width } = useWindowDimensions();
  let { serverId } = useParams();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || error) {
      navigate("/login");
    }
  }, [user, error, loading, navigate]);

  useEffect(() => {
    if (width >= 1024) {
      setShowSidebar(true);
    }
  }, [width]);

  const toggleSidebar = () => setShowSidebar((show) => !show);
  const toggleMembers = () => setShowMembers((show) => !show);

  return (
    <div className="flex h-full w-fit overflow-hidden lg:w-full">
      <Sidebar onNewServer={() => setOpenModal(NEWSERVER)} show={showSidebar} toggle={toggleSidebar} />
      <div
        className={
          "flex w-screen flex-col bg-gray-700 text-gray-100 transition-transform lg:w-full " +
          (showSidebar ? "-translate-x-[0rem]" : "-translate-x-[20rem]")
        }
      >
        <div className="sticky top-0 flex flex-row items-center gap-4 px-4 shadow-sm shadow-black">
          {width < 1024 && (
            <button onClick={toggleSidebar} className="text-2xl">
              <HiMenu />
            </button>
          )}
          <div className="flex items-center gap-2 px-2">
            <FaHashtag className="text-xl text-gray-600" />
            <h1 className="font-medium text-gray-100">Title</h1>
          </div>
          <div className="h-12 flex-1"></div>
          <button onClick={toggleMembers} className="text-2xl text-gray-500">
            <MdPeopleAlt />
          </button>
        </div>
        {!serverId && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
            <img src={MainBg} alt="Wumpus" />
            <p className="text-center text-gray-500">No one&apos;s around to play with Wumpus!</p>
          </div>
        )}
      </div>
      {showMembers && <div>Members Placeholder</div>}
      <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
        <NewServer onClose={() => setOpenModal(null)} />
      </Modal>
    </div>
  );
}

export default Main;
