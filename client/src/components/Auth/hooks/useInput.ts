import { useState } from "react";
import { IValidation } from "./Model/IValidation";
import { useValidation } from "./useValidation";

export const useInput = (initialValue: string, validations: IValidation) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: string) => {
    setValue(e);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid,
  };
};
