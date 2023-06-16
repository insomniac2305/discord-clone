import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import NewServer from "../components/NewServer";
import { NEWSERVER } from "../util/Constants";
import Sidebar from "../components/Sidebar";
import MainBg from "../assets/main-bg.svg";

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  let { serverId } = useParams();

  // useEffect(() => {
  //   if (!user || error) {
  //     navigate("/login");
  //   }
  // }, [user, error, navigate]);

  return (
    <div className="flex h-full">
      <Sidebar onNewServer={() => setOpenModal(NEWSERVER)} />
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-gray-700 p-4 text-gray-500">
        {!serverId && (
          <>
            <img src={MainBg} alt="Wumpus" />
            <p className="text-center">No one's around to play with Wumpus!</p>
          </>
        )}
      </div>
      <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
        <NewServer onClose={() => setOpenModal(null)} />
      </Modal>
    </div>
  );
}

export default Main;
