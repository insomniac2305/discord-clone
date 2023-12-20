import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { STYLE_PRIMARY } from "../util/Constants";

function Button({ text, onClick, loading, type, style }) {
  let colors;
  if (style === STYLE_PRIMARY) {
    colors = "bg-blurple-400 hover:bg-blurple-500 active:bg-blurple-600";
  } else {
    colors = "bg-gray-650 hover:bg-gray-620 active:bg-gray-610";
  }

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`w-full rounded p-3 font-medium text-white ${colors}`}
      disabled={loading}
    >
      {loading && <CgSpinnerAlt className="inline-block animate-spin text-xl" />}
      {loading || text}
    </button>
  );
}

export default Button;
