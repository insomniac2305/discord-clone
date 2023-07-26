import React, { useEffect, useRef, useState } from "react";

function PopupMenu({ clickTarget, popupBoundary, top, left, children }) {
  const [position, setPosition] = useState([0, 0]);
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (visible) {
        setVisible(false);
        return;
      }

      if (!clickTarget || !popupRef) return;

      const targetRect = clickTarget.getBoundingClientRect();

      let posX = e.clientX + window.scrollX;
      let posY = e.clientY + window.scrollY;

      if (
        posX > targetRect.right + window.scrollX ||
        posX < targetRect.left + window.scrollX ||
        posY > targetRect.bottom + window.scrollY ||
        posY < targetRect.top + window.scrollY
      ) {
        return;
      }

      if (top !== "undefined" && top !== null && left !== "undefined" && left !== null ) {
        posX = left;
        posY = top;
      } else if (popupBoundary) {
        const boundaryRect = popupBoundary.getBoundingClientRect();
        const popupWidth = popupRef.current.offsetWidth;
        const popupHeight = popupRef.current.offsetHeight;

        posX = posX + popupWidth > boundaryRect.width ? posX - popupWidth : posX;
        posY = posY + popupHeight > boundaryRect.height ? posY - popupHeight : posY;
      }

      setPosition([posX, posY]);
      setVisible(true);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [visible, top, left, clickTarget, popupBoundary, popupRef]);

  return (
    <div
      data-popup
      ref={popupRef}
      className={
        "absolute origin-top rounded bg-gray-900 p-2 transition-transform " + (visible ? "scale-100" : "scale-0")
      }
      style={{
        top: position[1] + "px",
        left: position[0] + "px",
      }}
    >
      {children}
    </div>
  );
}

export default PopupMenu;
