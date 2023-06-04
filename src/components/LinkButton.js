function LinkButton(props) {
  return (
    <button className="text-blue hover:underline" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default LinkButton;