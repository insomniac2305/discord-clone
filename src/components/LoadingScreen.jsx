import React from "react";
import LoadingAnimation from "../assets/loading.webm";

function LoadingScreen({ loading, error }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-100">
      {loading && <video src={LoadingAnimation} autoPlay loop width="200px"></video>}
      {error && <p className="text-red">There was an error: {error.message}</p>}
    </div>
  );
}

export default LoadingScreen;
