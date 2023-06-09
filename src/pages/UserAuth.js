import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "../util/Constants.js";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import AuthBackground from "../components/AuthBackground.js";
import Modal from "../components/Modal.js";

function UserAuth({ mode }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute -bottom-0 -right-0 left-0 top-0 -z-10">
        <AuthBackground />
      </div>
      <div className="flex h-full w-full sm:items-center sm:justify-center">
        <Modal open={mode === LOGIN} dimBackdrop={false} locked={true}>
          <Login />
        </Modal>
        <Modal open={mode === REGISTER} dimBackdrop={false} locked={true}>
          <Register />
        </Modal>
      </div>
    </>
  );
}

export default UserAuth;
