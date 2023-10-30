import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddServerMember from "../../hooks/useAddServerMember";
import AuthContext from "../../util/AuthContext";
import { ROLE_MEMBER } from "../../util/Constants";
import LoadingScreen from "../../components/LoadingScreen";

function JoinServer() {
  const navigate = useNavigate();
  const { serverId } = useParams();
  const { user } = useContext(AuthContext);
  const [addServerMember, loading, error] = useAddServerMember();

  useEffect(() => {
    const addCurrentUserToServer = async () => {
      if (user && serverId) {
        await addServerMember(user._id, serverId, ROLE_MEMBER, user.name, user.avatar);
        !error && navigate("/app/" + serverId);
      } else {
        navigate("/app");
      }
    };

    addCurrentUserToServer();
  }, []);

  return <LoadingScreen loading={loading} error={error} />;
}

export default JoinServer;
