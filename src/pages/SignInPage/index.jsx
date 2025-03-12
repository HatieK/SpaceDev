import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { regex, required } from "../../utilities/validate";
import { PATH } from "../../config/path";
import { useAuth } from "../../components/AuthContext";
import Input from "../../components/Input";
import { useAsync } from "../../hooks/useAsync";
import { Button } from "../../components/Button";

const SignInPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { loading, execute: loginService } = useAsync(login);

  const { values, register, validate, errors } = useForm({
    username: [required(), regex("email")],
    password: [required()],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      loginService(values);
      navigate(PATH.profile.index);
    }
  };

  return (
    <main id="main">
      <div className="auth">
        <div className="wrap">
          {/* login-form */}
          <form className="ct_login" onSubmit={onSubmit}>
            <h2 className="title">Đăng nhập</h2>
            <Input
              placeholder="Email / Số điện thoại"
              {...register("username")}
            />

            <Input
              placeholder="password"
              type="password"
              {...register("password")}
            />

            {/* <FormField placeholder="Mật khẩu" {...register("password")} /> */}
            <div className="remember">
              <label className="btn-remember">
                <div>
                  <input type="checkbox" />
                </div>
                <p>Nhớ mật khẩu</p>
              </label>
              <a href="./reset-password.html" className="forget">
                Quên mật khẩu?
              </a>
            </div>
            <Button loading={loading} className="btn rect main btn-login">
              đăng nhập
            </Button>
            <div className="text-register">
              <span>Nếu bạn chưa có tài khoản?</span>{" "}
              <a className="link" href="./signup.html">
                Đăng ký
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
