import React from "react";
import { LOGIN, REGISTER } from "../util/Constants";
import Login from "../components/Login";
import Register from "../components/Register";
import AuthBackground from "../components/AuthBackground";
import Modal from "../components/Modal";

function UserAuth({ mode }) {
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
