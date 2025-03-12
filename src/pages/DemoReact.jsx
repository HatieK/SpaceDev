import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";

const DemoReact = () => {
  const [random, setRandom] = useState(Math.random());

  useEffect(() => {
    setInterval(() => {
      setRandom(Math.random());
    }, 100);
  }, []);

  console.log('🚀"re-render"---->', "re-render");

  const [count, setCount] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    console.log("🚀inputRef.current---->", inputRef.current);
  }, []);

  /*
  lưu trữ giá trị không bị thay đổi mỗi lần component re-render

  C2: dùng để DOM tới giá trị một thẻ html
  nhược điểm là ko thể đặt ref vào trong một component ==> dùng forwardRef

  forwardRef và useImperativeHandle

 * COMPONENT CHA RE-RENDER KÉO  THEO COMPONENT CON BỊ RE-RENDER NHƯNG
  COMPONENT CON KO THAY ĐỔI GÌ THÌ SỰ RE0RENDER NÀY LÀ KO CẦN THIẾT
  */

  return (
    <main id="main">
      <div className="register-course">
        <section className="section-1 wrap container">
          {/* <div class="main-sub-title">liên hệ</div> */}
          <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
          <p className="top-des">
            Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau
            tạo ra những sản phẩm giá trị, cũng như việc hợp tác với các đối tác
            tuyển dụng và công ty trong và ngoài nước.
          </p>
          <form className="form">
            <label>
              <p>
                Họ và tên<span>*</span>
              </p>
              <Input ref={inputRef} type="text" placeholder="Họ và tên bạn" />
            </label>
            <label>
              <p>Số điện thoại</p>
              <input type="text" placeholder="Số điện thoại" />
            </label>
            <label>
              <p>
                Email<span>*</span>
              </p>
              <input type="text" placeholder="Email của bạn" />
            </label>
            <label>
              <p>Website</p>
              <input type="text" placeholder="Đường dẫn website http://" />
            </label>
            <label>
              <p>
                Tiêu đề<span>*</span>
              </p>
              <input type="text" placeholder="Tiêu đề liên hệ" />
            </label>
            <label>
              <p>
                Nội dung<span>*</span>
              </p>
              <textarea name id cols={30} rows={10} defaultValue={""} />
            </label>
            <button className="btn main rect">đăng ký</button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default DemoReact;
