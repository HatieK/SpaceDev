import styled from "styled-components";

export const ButtonStyle = styled.button`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
