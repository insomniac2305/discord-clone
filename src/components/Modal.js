import { useEffect, useRef, useState } from "react";

function Modal({ open, onClose, children, locked, dimBackdrop, ...props }) {
  const modalRef = useRef(null);
  const [classes, setClasses] = useState("");

  const onClick = (e) => {
    if (e.target === modalRef.current && !locked) {
      onClose();
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (!locked) onClose();
  };

  useEffect(() => {
    let classArray = [];
    classArray.push(
      dimBackdrop
        ? "backdrop:transition-all backdrop:bg-[#3333334d] backdrop:backdrop-blur-sm"
        : "backdrop:bg-[#00000000]"
    );

    if (open) {
      modalRef.current.open || modalRef.current.showModal();
      classArray.push("opacity-100 translate-y-0 scale-100");
    } else {
      classArray.push("opacity-0 -translate-y-10 scale-110 backdrop:bg-[#00000000] backdrop:backdrop-blur-0");
    }

    setClasses(classArray.join(" "));
  }, [open, dimBackdrop]);

  const onTransitionEnd = () => {
    if (!open) {
      modalRef.current.close();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onClick={onClick}
      onClose={onClose}
      onCancel={onCancel}
      onTransitionEnd={onTransitionEnd}
      className={
        classes + " rounded p-0 transition-all ease-[cubic-bezier(.25,.25,.3,1.5)] duration-200 focus:outline-0 active:outline-0"
      }
    >
      {children}
    </dialog>
  );
}

export default Modal;
