import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";
import IconPicker from "./IconPicker";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useUpdateUser from "../hooks/useUpdateUser";

function UserForm({ isNew, currentEmail, currentUsername, currentAvatarUrl, onSubmit }) {
  const [email, setEmail] = useState(currentEmail || "");
  const [username, setUsername] = useState(currentUsername || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(currentAvatarUrl);
  const navigate = useNavigate();
  const [createUser, createdUser, createLoading, createError] = useCreateUserWithEmailAndPassword(auth);
  const [updateUser, updateLoading, updateError] = useUpdateUser(onSubmit);

  useEffect(() => {
    if (createLoading) {
      return;
    }
    if (createdUser) {
      navigate("/app");
    }
    if (createError) {
      console.error(createError);
    }
  }, [createdUser, createLoading, createError, navigate]);

  const register = async (e) => {
    e.preventDefault();
    await createUser(email, password);
    await updateUser({ username: username });
  };

  const update = async (e) => {
    e.preventDefault();
    updateUser({
      email: email !== currentEmail ? email : null,
      username: username !== currentUsername ? username : null,
      password: password !== "" ? password : null,
      avatarFile: avatar !== currentAvatarUrl ? avatar : null,
    });
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
        {!isNew && <IconPicker onChange={setAvatar} initialIconUrl={currentAvatarUrl} />}
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
          {(createError || updateError) && (
            <p className="pb-2 text-sm text-red">There was an error: {createError?.message || updateError?.message}</p>
          )}
          <PrimaryButton text={isNew ? "Continue" : "Save"} loading={createLoading || updateLoading} type={"submit"} />
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
