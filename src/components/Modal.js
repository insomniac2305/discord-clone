import { useEffect, useRef, useState } from "react";

function Modal({ open, onClose, children, locked, dimBackdrop, ...props }) {
  const modalRef = useRef(null);
  const [classes, setClasses] = useState("");
  const [renderContent, setRenderContent] = useState(false);

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
      setRenderContent(true);
      modalRef.current.open || modalRef.current.showModal();
      classArray.push("sm:opacity-100 translate-y-0 sm:scale-100");
    } else {
      classArray.push(
        "sm:opacity-0 translate-y-full sm:-translate-y-10 sm:scale-110 backdrop:bg-[#00000000] backdrop:backdrop-blur-0"
      );
    }

    setClasses(classArray.join(" "));
  }, [open, dimBackdrop]);

  const onTransitionEnd = () => {
    if (!open) {
      modalRef.current.close();
      setRenderContent(false);
    }
  };

  return (
    <>
      <dialog
        ref={modalRef}
        onClick={onClick}
        onClose={onClose}
        onCancel={onCancel}
        onTransitionEnd={onTransitionEnd}
        className={
          classes +
          " h-full max-h-full min-h-fit w-full min-w-fit max-w-full p-0 transition-all duration-300 ease-in focus:outline-0 active:outline-0 sm:h-fit sm:w-fit sm:rounded sm:duration-200 sm:ease-[cubic-bezier(.25,.25,.3,1.5)]"
        }
      >
        {renderContent && children}
      </dialog>
    </>
  );
}

export default Modal;
