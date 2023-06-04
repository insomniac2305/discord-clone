import Logo from "./Logo";
import { useState } from "react";
import TextInput from "./TextInput";
import LinkButton from "./LinkButton";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:rounded sm:shadow-md">
        <Logo />
        <h1 className="text-xl font-bold tracking-wide">Welcome back!</h1>
        <TextInput label="E-Mail" type="email" name="email" value={mail} onChange={setMail} required={true} />
        <div className="w-full">
          <TextInput label="Password" type="password" name="password" value={password} onChange={setPassword} required={true} />
          <p className="mt-1 w-full text-left text-xs">
            <LinkButton text="Forgot password?" />
          </p>
        </div>
        <div className="w-full">
          <PrimaryButton text="Sign in" />
          <p className="mt-2 w-full text-left text-xs tracking-wide text-gray-500">
            Need an account? <LinkButton text="Register" onClick={() => navigate("/register")} />
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
