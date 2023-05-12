import { useEffect, useState } from "react";
import { IValidation } from "./Model/IValidation";

export const useValidation = (value: string, validations: IValidation) => {
  const [isEmptyError, setEmptyError] = useState<string | null>(null);
  const [minLengthError, setMinLengthError] = useState<string | null>(null);
  const [maxLengthError, setMaxLengthError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty": {
          setEmptyError(value ? null : "The field can't be empty");
          break;
        }
        case "minLength": {
          setMinLengthError(
            value.length >= (validations[validation] || 8)
              ? null
              : `Min length is ${validations[validation]} symbols`
          );
          break;
        }
        case "maxLength": {
          setMaxLengthError(
            value.length <= (validations[validation] || 24)
              ? null
              : `Max length is ${validations[validation]} symbols`
          );
          break;
        }
        case "isEmail": {
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          setEmailError(
            re.test(String(value).toLowerCase()) ? null : "Not a valid email"
          );
        }
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmptyError || emailError || minLengthError || maxLengthError)
      setInputValid(false);
    else setInputValid(true);
  }, [isEmptyError, emailError, minLengthError, maxLengthError]);

  return {
    isEmptyError,
    emailError,
    minLengthError,
    maxLengthError,
    inputValid,
  };
};
