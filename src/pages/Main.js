import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import NewServer from "../components/NewServer";
import { NEWSERVER } from "../util/Constants";
import Sidebar from "../components/Sidebar";
import MainBg from "../assets/main-bg.svg";
import { HiMenu } from "react-icons/hi";
import useWindowDimensions from "../util/WindowDimensions";

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { width } = useWindowDimensions();
  let { serverId } = useParams();

  useEffect(() => {
    if (!user || error || loading) {
      navigate("/login");
    }
  }, [user, error, loading, navigate]);

  useEffect(() => {
    if (width >= 1024) {
      setShowSidebar(true);
    }
  }, [width]);

  const toggleSidebar = () => {
    setShowSidebar((show) => !show);
  };

  return (
    <div className="flex h-full w-fit overflow-hidden lg:w-full">
      <Sidebar onNewServer={() => setOpenModal(NEWSERVER)} show={showSidebar} toggle={toggleSidebar} />
      <div
        className={
          "flex w-screen flex-col bg-gray-700 text-gray-500 transition-transform lg:w-full " +
          (showSidebar ? "-translate-x-[0rem]" : "-translate-x-[20rem]")
        }
      >
        <div className="sticky top-0 flex items-center p-3 shadow-sm shadow-black">
          {width < 1024 && (
            <button onClick={toggleSidebar} className="text-2xl">
              <HiMenu />
            </button>
          )}
          <p>Title</p>
        </div>
        {!serverId && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
            <img src={MainBg} alt="Wumpus" />
            <p className="text-center">No one's around to play with Wumpus!</p>
          </div>
        )}
      </div>
      <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
        <NewServer onClose={() => setOpenModal(null)} />
      </Modal>
    </div>
  );
}

export default Main;
