import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../util/AuthContext";
import { ROLE_MEMBER } from "../../util/Constants";
import LoadingScreen from "../../components/LoadingScreen";
import useBackendRequest from "../../hooks/useBackendRequest";

function JoinServer() {
  const navigate = useNavigate();
  const { serverId } = useParams();
  const { user, token, authLoading } = useContext(AuthContext);
  const [submitServerMember, submitData, submitLoading, submitError] = useBackendRequest(
    serverId && `api/servers/${serverId}/members`
  );
  const isSubmitted = useRef(false);

  useEffect(() => {
    const addCurrentUserToServer = async () => {
      if (user && serverId) {
        if (isSubmitted.current) return;
        isSubmitted.current = true;

        await submitServerMember(token, "POST", { userid: user._id, role: ROLE_MEMBER });
      } else if (!authLoading) {
        navigate("/app");
      }
    };

    addCurrentUserToServer();
  }, [user]);

  useEffect(() => {
    if (submitData) {
      navigate("/app/" + serverId);
    }
  }, [submitData]);

  return <LoadingScreen loading={submitLoading || authLoading} error={submitError} />;
}

export default JoinServer;
