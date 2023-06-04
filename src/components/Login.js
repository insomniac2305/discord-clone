import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex h-full flex-col items-center bg-gray-800 px-4 py-6 text-white sm:h-auto sm:w-[30rem] sm:rounded">
        <Logo />
        <h1 className="m-4 text-xl font-bold tracking-wide">Welcome back!</h1>
        <TextInput label="E-Mail" type="email" value={mail} onChange={setMail} required={true} />
        <div className="mb-5 w-full" aria-hidden></div>
        <TextInput label="Password" type="password" value={password} onChange={setPassword} required={true} />
        <p className="mb-5 mt-1 w-full text-left text-xs">
          <LinkButton text="Forgot password?" />
        </p>
        <div className="mb-2 w-full">
          <PrimaryButton text="Sign in" />
        </div>
        <p className="mt-1 w-full text-left text-xs text-gray-500 tracking-wide">
          Need an account? <LinkButton text="Register" />
        </p>
      </div>
    </>
  );
}

export default Login;
