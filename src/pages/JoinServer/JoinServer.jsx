import React from "react";
import { useParams } from "react-router-dom";

function JoinServer() {
  const { serverId } = useParams();

  return <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-100">{serverId}</div>;
}

export default JoinServer;
