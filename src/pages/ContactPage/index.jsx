import React, { useState } from "react";
import FormField from "../../components/FormField";
import Header from "../../components/Header";
import { regex, required, validate } from "../../utilities/validate";
import { useForm } from "../../hooks/useForm";
import { organization } from "../../services/organization";
import { message } from "antd";
import { PATH } from "../../config/path";
import { Button } from "../../components/Button";
import { useAsync } from "../../hooks/useAsync";

const ContactPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  // const [loading, setLoading] = useState(false);

  const { execute, loading } = useAsync(organization.contact);

  const { values, register, validate, reset } = useForm({
    name: [required("Please Enter Your Name")],
    email: [required("Please Enter Your Email"), regex("email")],
    phone: [required("Please Enter Your Phone"), regex("phone")],
    website: [
      required("Please Enter Your Url"),
      regex("website", "Your Website is not valid"),
    ],
    title: [required("Please Enter This Field")],
    content: [required("Please Enter This Field")],
  });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        const response = await execute(values);
        if (response) {
          reset();
          message.success("Send Information Successfully");
          setIsSuccess(true);
        }
      } else {
        console.log('🚀"Validate error"---->', "Validate error");
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  return (
    <>
      <Header />
      <main id="main">
        <div className="register-course">
          <section className="section-1 wrap container">
            {/* <div class="main-sub-title">liên hệ</div> */}

            {isSuccess ? (
              <>
                <h2 className="main-title">Liên Hệ Thành Công</h2>
                <p className="top-des">
                  Thông tin đã được tiếp nhận chúng tôi sẽ gửi cho bạn trong
                  thời gian sớm nhất
                </p>
                <div className="flex justify-center">
                  <a
                    className="link"
                    to={PATH.contact}
                    onClick={() => {
                      setIsSuccess(false);
                    }}
                  >
                    Tiếp Tục Liên Hệ
                  </a>
                </div>
              </>
            ) : (
              <>
                <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
                <p className="top-des">
                  Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng
                  nhau tạo ra những sản phẩm giá trị, cũng như việc hợp tác với
                  các đối tác tuyển dụng và công ty trong và ngoài nước.
                </p>
                <form className="form" onSubmit={onSubmit}>
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
                    required
                    {...register("email")}
                  />
                  <FormField
                    label="Website"
                    placeholder="Website"
                    {...register("website")}
                  />
                  <FormField
                    label="Tiều Đề"
                    placeholder="Tiều Đề"
                    required
                    {...register("title")}
                  />
                  <FormField
                    label="Nội Dung"
                    required
                    renderInput={(props) => {
                      return (
                        <textarea
                          {...props}
                          placeholder="Nội Dung"
                          cols="30"
                          rows="10"
                        />
                      );
                    }}
                    {...register("content")}
                  />

                  <Button loading={loading}>đăng ký</Button>
                </form>
              </>
            )}
          </section>
          {/* <div class="register-success">
      <div class="contain">
          <div class="main-title">đăng ký thành công</div>
          <p>
              <strong>Chào mừng Vương Đặng đã trở thành thành viên mới của Spacedev Team.</strong> <br>
              Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
              hoặc số điện thoại của bạn.
          </p>
      </div>
      <a href="/" class="btn main rect">về trang chủ</a>
  </div> */}
        </div>
      </main>
    </>
  );
};

export default ContactPage;
