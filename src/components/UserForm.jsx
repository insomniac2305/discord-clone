import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";
import IconPicker from "./IconPicker";
import { useNavigate } from "react-router-dom";
import AuthContext from "../util/AuthContext";
import useBackendRequest from "../hooks/useBackendRequest";
import useLogin from "../hooks/useLogin";
import FormError from "./FormError";

function UserForm({ isNew, onSubmit }) {
  const { user: currentUser, setUser, token: currentToken, authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser?.email || "");
  const [username, setUsername] = useState(currentUser?.name || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const navigate = useNavigate();
  const [submitLogin, , loginLoading] = useLogin();
  const [submitUser, userData, userLoading, userError] = useBackendRequest(
    isNew ? "api/users" : `api/users/${currentUser?.id}`
  );

  useEffect(() => {
    if (isNew && currentUser) {
      navigate("/app");
    }
  }, [isNew, currentUser, navigate]);

  useEffect(() => {
    if (userData && isNew) {
      submitLogin(email, password);
    } else if (userData && !isNew) {
      setUser(userData);
      onSubmit();
    }
  }, [isNew, userData]);

  const register = (e) => {
    e.preventDefault();
    submitUser(null, "POST", { email, name: username, password });
  };

  const update = (e) => {
    e.preventDefault();
    const body = new FormData();
    email !== currentUser.email && body.append("email", email);
    username !== currentUser.name && body.append("name", username);
    password !== "" && body.append("password", password);
    avatar !== currentUser.avatar && body.append("avatar", avatar);

    submitUser(currentToken, "PUT", body);
  };

  return (
    <>
      <form
        action="#"
        onSubmit={isNew ? register : update}
        className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md"
      >
        {isNew && <Logo />}
        <h1 className="text-xl font-bold tracking-wide">{isNew ? "Create new account" : "Edit your profile"}</h1>
        {!isNew && <IconPicker onChange={setAvatar} initialIconUrl={currentUser.avatar} />}
        <TextInput
          label="E-Mail"
          type="email"
          name="register-email"
          value={email}
          onChange={setEmail}
          required={true}
        />
        <TextInput
          label="Username"
          type="text"
          name="register-username"
          value={username}
          onChange={setUsername}
          required={true}
        />
        <TextInput
          label="Password"
          type="password"
          name="register- password"
          value={password}
          onChange={setPassword}
          required={isNew}
        />
        <div className="w-full">
          {userError && <FormError error={userError} />}
          <PrimaryButton
            text={isNew ? "Continue" : "Save"}
            loading={userLoading || authLoading || loginLoading}
            type={"submit"}
          />
          {isNew && (
            <p className="mt-2 w-full text-left text-xs tracking-wide text-gray-500">
              <LinkButton text="Already have an account?" onClick={() => navigate("/login")} />
            </p>
          )}
        </div>
      </form>
    </>
  );
}

export default UserForm;
