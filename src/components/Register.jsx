import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/app");
    }
    if (error) {
      console.error(error);
    }
  }, [user, loading, error, navigate]);

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

  return (
    <>
      <form
        action="#"
        onSubmit={register}
        className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:rounded sm:shadow-md"
      >
        <Logo />
        <h1 className="text-xl font-bold tracking-wide">Create new account</h1>
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
          required={true}
        />
        <div className="w-full">
          {error && <p className="pb-2 text-sm text-red">There was an error: {error.message}</p>}
          <PrimaryButton text="Continue" loading={loading} type={"submit"} />
          <p className="mt-2 w-full text-left text-xs tracking-wide text-gray-500">
            <LinkButton text="Already have an account?" onClick={() => navigate("/login")} />
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;
