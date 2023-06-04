function PrimaryButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="w-full rounded bg-blurple-400 p-3 font-medium hover:bg-blurple-500 active:bg-blurple-600"
    >
      {props.text}
    </button>
  );
}

export default PrimaryButton;
