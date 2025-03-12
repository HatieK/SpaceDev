import { useEffect, useState } from "react";
import FormField from "../../components/FormField";
import { regex, required } from "../../utilities/validate";
import { useForm } from "../../hooks/useForm";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { courseService } from "../../services/course";
import { useScrollTop } from "../../hooks/useScrollTop";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useFetch } from "../../hooks/useFetch";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import { useAuth } from "../../components/AuthContext";
import { message } from "antd";
import { PATH } from "../../config/path";
import { useAsync } from "../../hooks/useAsync";
import { Button } from "../../components/Button";
import { handleError } from "../../utilities/handleError";

const RegisterPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  console.log("🚀user---->", user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { loading: registerLoading, execute: courseRegisterService } = useAsync(
    courseService.registerCourse
  );

  useEffect(() => {
    if (!user) {
      console.log("🚀3333---->", 3333);
      message.warning("Vui lòng đăng nhập trước khi đăng ký khóa học");
      navigate(PATH.signin, { state: { redirect: pathname } });
    }
  }, [user]);

  useScrollTop([id]);

  const { data, loading } = useFetch(
    () => courseService.getCourseDetail(id),
    [id]
  );

  const { register, validate, values } = useForm(
    {
      name: [required("Please Enter Your Name")],
      email: [required("Please Enter Your Email"), regex("email")],
      phone: [required("Please Enter Your Phone"), regex("phone")],
      facebook: [
        required("Please Enter Your Url"),
        regex(
          /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
          "Your Url is not valid"
        ),
      ],
      payment: [required("Please Choose Payment Method")],
      // coin: [required("Please Check Your Coin")],
    },
    {
      email: user?.username,
      name: user?.name,
      facebook: user?.fb,
      phone: user?.phone,
    }
  );

  const [isSuccess, setIsSuccess] = useState(false);

  if (loading) return null;

  let { data: detail } = data;

  const onSubmit = async () => {
    try {
      if (validate()) {
        await courseRegisterService(id, values);
        setIsSuccess(true);
      } else {
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <main id="main" className="register-course">
        {isSuccess ? (
          <div
            className="register-success"
            style={{
              textAlign: "center",
            }}
          >
            <div className="contain">
              <div className="main-title">đăng ký thành công</div>
              <p>
                <strong>
                  Chào mừng{values.name} đã trở thành thành viên mới của
                  Spacedev Team.
                </strong>
                <br />
                Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>,
                chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook hoặc
                số điện thoại của bạn.
              </p>
            </div>
            <Link
              to={PATH.profile.course}
              className="btn main rect"
              style={{ marginTop: "20px" }}
            >
              Về Trang Khóa Học Của Tôi
            </Link>
          </div>
        ) : (
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{detail.title} </h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong> {formatCurrency(detail.money)} VND
                </div>
              </div>
              <div className="form">
                <FormField
                  label="Họ và Tên"
                  placeholder="Họ và Tên"
                  required
                  {...register("name")}
                />
                <FormField
                  label="Số Điện Thoại"
                  placeholder="Số Điện Thoại"
                  required
                  {...register("phone")}
                />
                <FormField
                  label="Email"
                  placeholder="Email..."
                  disabled
                  required
                  {...register("email")}
                />
                <FormField
                  label="URL Facebook"
                  placeholder="Link Facebook"
                  required
                  {...register("facebook")}
                />
                <FormField
                  label="Sử Dụng Coin"
                  {...register("coin")}
                  renderInput={(props) => (
                    <Checkbox {...props}>
                      Hiện Có <strong>300 Coins</strong>
                    </Checkbox>
                  )}
                />
                <FormField
                  label="Hình Thức Thanh Toán"
                  {...register("payment")}
                  required
                  renderInput={(props) => {
                    return (
                      <Select
                        {...props}
                        placeholder="Hình Thức Thanh Toán"
                        options={[
                          { value: "chuyen-khoan", label: "Chuyển Khoản" },
                          {
                            value: "thanh-toan-tien-mat",
                            label: "Thanh Toán Tiền Mặt",
                          },
                        ]}
                      />
                    );
                  }}
                  {...register("payment")}
                />
                <FormField
                  label="Ý Kiến Cá Nhân"
                  {...register("note")}
                  renderInput={(props) => (
                    <input
                      type="text"
                      placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                      {...props}
                    />
                  )}
                />

                <Button
                  loading={registerLoading}
                  onClick={onSubmit}
                  className="btn main rect"
                >
                  đăng ký
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default RegisterPage;
