import React from "react";

function MessageDivider({ children }) {
  return (
    <div className="mx-4 mt-8 flex h-0 items-center justify-center border-t border-gray-650 align-baseline">
      <span className="bg-gray-700 p-2 text-xs font-bold text-gray-600">{children}</span>
    </div>
  );
}

export default MessageDivider;
