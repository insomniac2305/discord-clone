import { useState } from "react";

function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue || false);

  const toggleValue = () => setValue((val) => !val);

  return [value, toggleValue];
}

export default useToggle;
