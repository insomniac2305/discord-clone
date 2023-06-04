function TextInput(props) {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor="mail" className="mb-2 text-xs  font-bold uppercase tracking-wider text-gray-500">
        {props.label} {props.required && <span className="text-red">*</span>}
      </label>
      <input
        type={props.type}
        name="mail"
        id="mail"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="rounded bg-gray-900 p-2"
      />
    </div>
  );
}

export default TextInput;
