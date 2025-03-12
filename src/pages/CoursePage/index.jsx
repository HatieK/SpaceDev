import React from "react";
import CourseCard, { CardLoading } from "../../components/CourseCard";
import { useFetch } from "../../hooks/useFetch";
import { courseService } from "../../services/course";

const CoursePage = () => {
  const { data: courses, loading } = useFetch(() => courseService.getCourse());

  return (
    <main id="main">
      <section className="section-1">
        <div className="container">
          <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
          <p className="top-des">
            Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt
            động kinh doanh hay chỉ đơn giản là muốn khám phá thế giới, hãy chọn
            lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của
            bạn.
          </p>
          <div className="textbox" style={{ marginTop: 100 }}>
            <h3 className="sub-title">KHÓA HỌC</h3>
            <h2 className="main-title">OFFLINE</h2>
          </div>
          <div className="list row">
            {loading
              ? Array.from(Array(6)).map((_, i) => <CardLoading key={i} />)
              : courses?.data?.map((course) => {
                  return <CourseCard key={course?.id} {...course} />;
                })}
          </div>
          <div className="flex justify-center">
            <a href="./course-list.html" className="btn main">
              Tất cả khóa học
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoursePage;
