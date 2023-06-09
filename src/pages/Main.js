import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import PrimaryButton from "../components/PrimaryButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || error) {
      navigate("/login");
    }
  }, [user, error, navigate]);

  return (
    <>
      Main
      {user && (
        <div>
          <div>User: {user.email}</div>
          <div>
            <PrimaryButton onClick={() => signOut(auth)} text="Sign out" loading={loading} />
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
