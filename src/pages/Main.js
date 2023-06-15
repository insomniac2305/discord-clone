import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import NewServer from "../components/NewServer";
import { NEWSERVER } from "../util/Constants";
import Sidebar from "../components/Sidebar";

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    if (!user || error) {
      navigate("/login");
    }
  }, [user, error, navigate]);

  return (
    <div className="flex h-full">
      <Sidebar>

      </Sidebar>
      <button onClick={() => setOpenModal(NEWSERVER)}>New Server</button>
      <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
        <NewServer onClose={() => setOpenModal(null)} />
      </Modal>
    </div>
  );
}

export default Main;
