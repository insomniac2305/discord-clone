import { CgSpinnerAlt } from "react-icons/cg";

function PrimaryButton({ text, onClick, loading, type }) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className="w-full rounded bg-blurple-400 p-3 font-medium text-white hover:bg-blurple-500 active:bg-blurple-600"
      disabled={loading}
    >
      {loading && <CgSpinnerAlt className="inline-block animate-spin text-xl" />}
      {loading || text}
    </button>
  );
}

export default PrimaryButton;
