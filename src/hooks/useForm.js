import { useState } from "react";
import { validate } from "../utilities/validate";

export const useForm = (rules, initialValue = {}) => {
  const [values, setValues] = useState(initialValue);

  const [errors, setErrors] = useState({});

  const register = (fieldName) => {
    return {
      value: values[fieldName] || "",
      onChange: (e) => setValues({ ...values, [fieldName]: e.target.value }),
      error: errors[fieldName],
    };
  };

  const reset = () => {
    setValues({});
  };

  const _validate = () => {
    const errorObject = validate(rules, values);
    console.log("🚀errorObject---->", errorObject);

    setErrors(errorObject);
    return Object.keys(errorObject).length === 0;
  };

  return {
    values,
    errors,
    register,
    validate: _validate,
    reset,
  };
};
