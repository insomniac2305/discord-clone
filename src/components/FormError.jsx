import React from "react";

function FormError({error}) {
  return error?.errors ? (
    <ul className="pb-2 text-sm text-red">
      {error.errors.map((error) => (
        <li key={error.path}>{error.msg}</li>
      ))}
    </ul>
  ) : (
    <p className="pb-2 text-sm text-red">There was an error: {error?.message}</p>
  );
}

export default FormError;
