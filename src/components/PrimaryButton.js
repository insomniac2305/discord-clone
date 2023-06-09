import { CgSpinnerAlt } from "react-icons/cg";

function PrimaryButton({ text, onClick, loading, type }) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className="w-full rounded bg-blurple-400 p-3 font-medium hover:bg-blurple-500 active:bg-blurple-600"
    >
      {loading && <CgSpinnerAlt className="animate-spin inline-block text-xl" />}
      {loading || text}
    </button>
  );
}

export default PrimaryButton;
