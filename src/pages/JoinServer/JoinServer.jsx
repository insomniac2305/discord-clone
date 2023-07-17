import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddServerMember from "../../hooks/useAddServerMember";
import AuthContext from "../../util/AuthContext";
import { ROLE_MEMBER } from "../../util/Constants";
import { CgSpinnerAlt } from "react-icons/cg";

function JoinServer() {
  const navigate = useNavigate();
  const { serverId } = useParams();
  const user = useContext(AuthContext);
  const [addServerMember, loading, error] = useAddServerMember();

  useEffect(() => {
    const addCurrentUserToServer = async () => {
      if (user && serverId) {
        await addServerMember(user.uid, serverId, ROLE_MEMBER, user.displayName, user.photoURL);
        !error && navigate("/app/" + serverId);
      } else {
        navigate("/app");
      }
    };

    addCurrentUserToServer();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-100">
      {loading && <CgSpinnerAlt className="text-3xl" />}
      {error && <p className="text-red">There was an error: {error.message}</p>}
    </div>
  );
}

export default JoinServer;
