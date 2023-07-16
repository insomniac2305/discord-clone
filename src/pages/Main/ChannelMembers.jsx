import React from "react";
import useServerMembers from "../../hooks/useServerMembers";
import User from "../../components/User";
import { ROLE_ADMIN } from "../../util/Constants";
import { FaCrown } from "react-icons/fa";

function ChannelMembers({ isVisible, serverId }) {
  const [serverMembers] = useServerMembers(serverId);

  return (
    <div
      className={
        "absolute right-0 top-0 h-full min-w-[15rem] bg-gray-800 transition-transform " +
        (isVisible ? "translate-x-0" : "translate-x-[15rem]")
      }
    >
      <ul className="mx-2 my-4">
        {serverMembers?.map((member) => {
          return (
            <li className="flex items-center rounded p-1 hover:bg-gray-680 gap-2" key={member.id}>
              <User username={member.username} avatarUrl={member.avatarUrl} />
              {member.role === ROLE_ADMIN && <FaCrown className="text-sm text-[#f0b132]" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChannelMembers;
