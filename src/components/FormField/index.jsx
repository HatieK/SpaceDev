import React, { memo } from "react";
import styled from "styled-components";

const ErrorSpan = styled.span`
  color: red;
  position: absolute;
  top: 100%;
  left: 230px;
  font-size: 0.875rem;
  font-style: italic;
`;

const FormField = ({
  label,
  required,
  type = "text",
  renderInput,
  error,
  placeholder,
  ...props
}) => {
  return (
    <>
      <label style={{ position: "relative" }}>
        <p>
          {label} {required && <span>*</span>}
        </p>
        {renderInput ? (
          renderInput?.(props)
        ) : (
          <input type={type} placeholder={placeholder} {...props} />
        )}
        {error && <ErrorSpan>{error}</ErrorSpan>}
      </label>
    </>
  );
};

export default FormField;
