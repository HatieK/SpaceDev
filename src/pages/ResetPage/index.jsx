import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAsync } from "../../hooks/useAsync";
import { userServices } from "../../services/user";
import { confirm, regex, required } from "../../utilities/validate";
import FormField from "../../components/FormField";
import { Button } from "../../components/Button";
import { handleError } from "../../utilities/handleError";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
import { setToken } from "../../utilities/token";
import { useAuth } from "../../components/AuthContext";

const ResetPassword = () => {
  const [search] = useSearchParams();
  const code = search.get("code");

  const { getProfile } = useAuth();

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    execute: sendEmailResetPasswordService,
    loading: sendEmailResetPasswordLoading,
  } = useAsync(userServices.sendEmailResetPassword);
  const { execute: resetPasswordService, loading: resetPasswordLoading } =
    useAsync(userServices.resetPasswordByCode);

  const resetPasswordForm = useForm({
    password: [required()],
    confirmPassword: [required(), confirm("password")],
  });
  const sendEmailForm = useForm({
    username: [required(), regex("email")],
  });

  const onSendEmail = async () => {
    try {
      if (sendEmailForm.validate()) {
        const res = await sendEmailResetPasswordService(sendEmailForm.values);
        message.success(res.message);
        setIsSuccess(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onResetPassword = async () => {
    try {
      if (resetPasswordForm.validate()) {
        const res = await resetPasswordService({
          password: resetPasswordForm.values.password,
          code,
        });
        setToken(res.data);
        getProfile();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <main id="main">
      <div className="auth">
        {code ? (
          <div className="wrap">
            <h2 className="title">Đặt lại mật khẩu</h2>
            <FormField
              {...resetPasswordForm.register("password")}
              placeholder="Password"
              type="password"
            />
            <FormField
              {...resetPasswordForm.register("confirmPassword")}
              placeholder="Nhập lại mật khẩu"
              type="password"
            />

            <Button
              loading={resetPasswordLoading}
              className="btn rect main"
              onClick={onResetPassword}
            >
              Đặt lại mật khẩu
            </Button>
          </div>
        ) : isSuccess ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>
              Gửi Email Để Lấy Lại Mật Khẩu Thành Công
            </h2>
            <p>Chúng Tôi Đã gửi Email</p>
          </div>
        ) : (
          <div className="wrap">
            <h2 className="title">Đặt lại mật khẩu</h2>
            <FormField
              {...sendEmailForm.register("username")}
              placeholder="Email"
            />
            <Button
              loading={sendEmailResetPasswordLoading}
              className="btn rect main"
              onClick={onSendEmail}
            >
              Đặt lại mật khẩu
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
