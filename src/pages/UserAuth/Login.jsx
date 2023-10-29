import Logo from "../../components/Logo";
import React, { useContext, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import LinkButton from "../../components/LinkButton";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../util/AuthContext";
import useLogin from "../../hooks/useLogin";
import FormError from "../../components/FormError";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [submitLogin, , loginLoading, loginError] = useLogin();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    submitLogin(email, password);
  };

  return (
    <>
      <form
        action="#"
        onSubmit={onSubmit}
        className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:rounded sm:shadow-md"
      >
        <Logo />
        <h1 className="text-xl font-bold tracking-wide">Welcome back!</h1>

        <TextInput label="E-Mail" type="email" name="login-email" value={email} onChange={setEmail} required={true} />
        <div className="w-full">
          <TextInput
            label="Password"
            type="password"
            name="login-password"
            value={password}
            onChange={setPassword}
            required={true}
          />
          <p className="mt-1 w-full text-left text-xs">
            <LinkButton text="Forgot password?" />
          </p>
        </div>
        <div className="w-full">
          {loginError && <FormError error={loginError} />}
          <PrimaryButton text="Sign in" type="submit" loading={loginLoading} />
          <p className="mt-2 w-full text-left text-xs tracking-wide text-gray-500">
            Need an account? <LinkButton text="Register" onClick={() => navigate("/register")} />
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
