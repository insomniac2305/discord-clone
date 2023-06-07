import Logo from "./Logo";
import { useState } from "react";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";

function Register() {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:rounded sm:shadow-md">
        <Logo />
        <h1 className="text-xl font-bold tracking-wide">Create new account</h1>
        <TextInput label="E-Mail" type="email" name="register-email" value={mail} onChange={setMail} required={true} />
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
          <PrimaryButton text="Continue" />
          <p className="mt-2 w-full text-left text-xs tracking-wide text-gray-500">
            <LinkButton text="Already have an account?" onClick={() => navigate("/login")} />
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
