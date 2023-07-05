import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

function UserForm({ isNew, currentEmail, currentUsername, onSubmit }) {
  const [email, setEmail] = useState(currentEmail || "");
  const [username, setUsername] = useState(currentUsername || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, createdUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);
  const [updateProfile, profileUpdating, profileError] = useUpdateProfile(auth);
  const [updatePassword, passwordUpdating, passwordError] = useUpdatePassword(auth);

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
    try {
      const createResponse = await createUserWithEmailAndPassword(email, password);
      const newUser = createResponse.user;
      await newUser.updateProfile({ displayName: username });
    } catch (err) {
      console.error(err);
    }
  };

  const getError = () => {
    return [createError, emailError, profileError, passwordError].find((error) => error !== undefined);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let isUpdateSuccessful = true;
    try {
      if (email !== currentEmail) {
        isUpdateSuccessful = await updateEmail(email);
      }
      if (username !== currentUsername) {
        isUpdateSuccessful = await updateProfile({
          displayName: username,
        });
      }
      if (password !== "") {
        isUpdateSuccessful = await updatePassword(password);
      }
    } catch (err) {
      console.error(err);
    }
    isUpdateSuccessful && onSubmit();
  };

  return (
    <>
      <form
        action="#"
        onSubmit={isNew ? register : updateUser}
        className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md"
      >
        {isNew && <Logo />}
        <h1 className="text-xl font-bold tracking-wide">{isNew ? "Create new account" : "Edit your profile"}</h1>
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
          {getError() && <p className="pb-2 text-sm text-red">There was an error: {getError().message}</p>}
          <PrimaryButton
            text={isNew ? "Continue" : "Save"}
            loading={createLoading || emailUpdating || profileUpdating || passwordUpdating}
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
