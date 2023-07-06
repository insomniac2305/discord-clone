import React, { useState } from "react";

function SidebarItem({ onClick, active, popupText, children }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative flex h-12 w-12 cursor-pointer items-center">
      <div
        className={
          "absolute -left-4 w-2 rounded-2xl bg-gray-100 transition-all" +
          (active ? " h-10 scale-100" : hover ? " h-6 scale-100" : " h-0 scale-0")
        }
      />
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onClick()}
        className={
          "h-full w-full overflow-hidden transition-all duration-200 hover:rounded-2xl active:translate-y-[0.1rem]" +
          (active ? " rounded-2xl" : " rounded-[50%]")
        }
      >
        {children}
      </button>
      <div
        className={
          "absolute left-[4.3rem] w-max rounded-md bg-gray-900 p-2 font-bold text-gray-400 shadow-xl transition-all" +
          (hover ? " scale-100 opacity-100" : " scale-90 opacity-0 -z-10")
        }
      >
        <div className="absolute -left-1 top-[calc(50%-0.25rem)] h-2 w-2 rotate-45 bg-gray-900"></div>
        {popupText}
      </div>
    </div>
  );
}

export default SidebarItem;
