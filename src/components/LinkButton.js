function LinkButton({text, onClick}) {
  return (
    <button type="button" className="text-blue hover:underline" onClick={onClick}>
      {text}
    </button>
  );
}

export default LinkButton;
