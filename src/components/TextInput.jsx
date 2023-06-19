import React from "react";

function TextInput({ name, label, required, type, value, onChange }) {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="rounded bg-gray-900 p-2"
      />
    </div>
  );
}

export default TextInput;
