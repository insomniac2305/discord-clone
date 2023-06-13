import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import NewServer from "../components/NewServer";
import { NEWSERVER } from "../util/Constants";

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
    <>
      Main
      {user && (
        <div>
          <div>User: {user.email}</div>
          <div>
            <PrimaryButton onClick={() => signOut(auth)} text="Sign out" loading={loading} />
          </div>
        </div>
      )}
      <button onClick={() => setOpenModal(NEWSERVER)}>New Server</button>
      <Modal open={openModal === NEWSERVER} dimBackdrop={true} locked={false} onClose={() => setOpenModal(null)}>
        <NewServer onClose={() => setOpenModal(null)} />
      </Modal>
    </>
  );
}

export default Main;
