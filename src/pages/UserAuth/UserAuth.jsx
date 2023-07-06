import React from "react";
import { LOGIN, REGISTER } from "../../util/Constants";
import Login from "./Login";
import UserForm from "../../components/UserForm";
import AuthBackground from "./AuthBackground";
import Modal from "../../components/Modal";

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
          <UserForm isNew={true}/>
        </Modal>
      </div>
    </>
  );
}

export default UserAuth;
