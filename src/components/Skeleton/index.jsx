import React from "react";
import { SkeletonStyle } from "./style";

const Skeleton = ({
  shape = "rectangle",
  children,
  width,
  height,
  ...props
}) => {
  return (
    <SkeletonStyle
      {...props}
      className={`${shape} ${props.className ?? ""}`}
      style={{ width, height, ...props.style }}
    >
      {children}
    </SkeletonStyle>
  );
};

export default Skeleton;
