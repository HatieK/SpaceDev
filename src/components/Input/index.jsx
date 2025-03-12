import React, { memo } from "react";
import { ErrorText, InputStyle } from "./style";
import classNames from "classnames";

const Input = memo(({ error, className, type = "text", ...props }) => {
  console.log('🚀"input render"---->', "input render");

  return (
    <InputStyle
      className={classNames(className, { error })}
      style={{ marginTop: "15px" }}
    >
      <input {...props} type={type} />

      {error && <ErrorText>{error}</ErrorText>}
    </InputStyle>
  );
});

export default Input;
