import { ButtonStyle } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

export const Button = ({ loading, children, ...props }) => {
  return (
    <ButtonStyle
      disabled={loading}
      {...props}
      className={`btn main rect gap-3 ${props.className ?? ""}`}
    >
      {loading && <LoadingOutlined style={{ fontSize: 20 }} />}
      {children}
    </ButtonStyle>
  );
};
