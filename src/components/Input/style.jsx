import styled from "styled-components";

export const InputStyle = styled.div`
  position: relative;
  &.error {
    input {
      border: 1px solid red;
    }
  }
`;

export const ErrorText = styled.div`
  color: red;
  position: absolute;
  bottom: -7px;
  font-style: italic;
  font-size: 0.875rem;
`;
