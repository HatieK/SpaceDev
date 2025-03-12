import React, { useState } from "react";
import { userServices } from "../../services/user";
import { Button } from "../../components/Button";
import { useForm } from "../../hooks/useForm";
import { confirm, minMax, regex, required } from "../../utilities/validate";
import styled from "styled-components";
import { useAsync } from "../../hooks/useAsync";
import { message } from "antd";
import Input from "../../components/Input";
import { LoadingOutlined } from "@ant-design/icons";

const ErrorText = styled.p`
  color: red;
`;

const SignUp = () => {
  const { execute: signup, loading } = useAsync(userServices.signup);
  const { execute: resendEmail, loading: resendEmailLoading } = useAsync(
    userServices.resendEmail
  );

  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const { values, validate, register, errors } = useForm({
    name: [required()],
    password: [required(), minMax(6, 22)],
    confirmPassword: [required(), confirm("password")],
    username: [required(), regex("email")],
  });

  const onSubmit = async () => {
    try {
      if (validate()) {
        await signup(values);
        setIsSignUpSuccess(true);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error?.response?.data?.message);
      }
    }
  };

  const onResendEmail = async (e) => {
    e.preventDefault();
    try {
      await resendEmail({
        username: values.username,
      });
      message.success("Email đã được gửi lại thành công");
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <main id="main">
      {isSignUpSuccess ? (
        <div
          style={{
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            gap: "20px",
            padding: "30px 30px",
          }}
        >
          <h1>
            Đăng Ký Thành Công, Vui lòng Kiểm Tra Email để kích hoạt. Nếu bạn
            không nhận được Email, vui lòng bấm{" "}
            <span className="font-bold">Gửi Lại Email</span>
            <div>
              <a onClick={onResendEmail} href="" className="link">
                {resendEmailLoading && <LoadingOutlined />}
                Gửi Lại Email kích hoạt
              </a>
            </div>
          </h1>
        </div>
      ) : (
        <div className="auth">
          <div className="wrap">
            <h2 className="title">Đăng ký</h2>
            <Input placeholder="Địa chỉ Email" {...register("username")} />
            <Input placeholder="Họ và tên" {...register("name")} />
            <Input
              placeholder="Mật Khẩu"
              type="password"
              {...register("password")}
            />
            <Input
              placeholder="Nhập Lại Mật Khẩu"
              type="password"
              {...register("confirmPassword")}
            />

            <p className="policy">
              Bằng việc đăng kí, bạn đã đồng ý{" "}
              <a href="#">Điều khoản bảo mật</a> của Spacedev
            </p>
            {/* <button className="btn rect main btn-login">Đăng ký</button> */}
            <Button onClick={onSubmit} className="btn-login" loading={loading}>
              Đăng Ký
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SignUp;
