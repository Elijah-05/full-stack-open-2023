import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const resetField = () => {
    setValue("");
  };

  return {
    attributes: { type, value, onChange },
    resetField,
  };
};
