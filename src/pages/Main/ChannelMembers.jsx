import React, { useContext, useEffect } from "react";
import User from "../../components/User";
import { ROLE_ADMIN } from "../../util/Constants";
import { FaCrown } from "react-icons/fa";
import useBackendRequest from "../../hooks/useBackendRequest";
import AuthContext from "../../util/AuthContext";

function ChannelMembers({ isVisible, serverId }) {
  const { token } = useContext(AuthContext);
  const [requestServerMembers, serverMembers] = useBackendRequest(serverId && `api/servers/${serverId}/members`);

  useEffect(() => {
    if (token && serverId) {
      requestServerMembers(token);
    }
  }, [token, serverId]);

  return (
    <div
      className={
        "absolute right-0 top-0 h-full w-[15rem] overflow-auto bg-gray-800 transition-transform " +
        (isVisible ? "translate-x-0" : "translate-x-[15rem]")
      }
    >
      <ul className="mx-2 my-4">
        {serverMembers?.map((member) => {
          return (
            <li className="flex items-center gap-2 rounded p-1 hover:bg-gray-680" key={member.user?._id}>
              <User username={member.user?.name} avatarUrl={member.user?.avatar} />
              {member.role === ROLE_ADMIN && <FaCrown className="text-sm text-[#f0b132]" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChannelMembers;
