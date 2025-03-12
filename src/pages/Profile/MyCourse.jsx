import React from "react";
import { useAsync } from "../../hooks/useAsync";
import { courseService } from "../../services/course";
import { useFetch } from "../../hooks/useFetch";
import Skeleton from "../../components/Skeleton";
import moment from "moment/moment";
import { generatePath, Link } from "react-router-dom";
import { PATH } from "../../config/path";

const MyCourse = () => {
  const { loading, data: courseList } = useFetch(courseService.getMyCourse);
  console.log("🚀courseList---->", courseList);

  if (loading) {
    return Array.from(
      Array(5).map((_, i) => (
        <div key={i} style={{ marginBottom: "5px" }}>
          <Skeleton height={250} />
        </div>
      ))
    );
  }

  return (
    <>
      {courseList?.data?.length === 0 && (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          BẠN CHƯA ĐĂNG KÝ KHÓA HỌC NÀO. VUI LÒNG ĐĂNG KÝ KHÓA HỌC PHÙ HỢP
        </p>
      )}
      <div className="tab2">
        {courseList?.data?.map((e) => {
          const coursePath = generatePath(PATH.courseDetail, {
            slug: e.course.slug,
            id: e.course.id,
          });

          return (
            <div key={e.course.id} className="item">
              <div className="cover">
                <img
                  src={
                    e.course.thumbnailUrl ||
                    "https://thienanblog.com/wp-content/uploads/2017/10/react-logo.png"
                  }
                  alt
                />
              </div>
              <div className="info">
                <Link to={coursePath} className="name">
                  {e.course.title}
                </Link>
                <div className="date">
                  Khai giảng ngày{" "}
                  {moment(e.course.opening_time).format("DD/MM/YYYY")}
                </div>
                <div className="row">
                  <div>
                    <img src="/img/clock.svg" alt className="icon" />
                    {e.total_hours} giờ
                  </div>
                  <div>
                    <img src="/img/play.svg" alt className="icon" />
                    {e.video} video
                  </div>
                  <div>
                    <img src="/img/user.svg" alt className="icon" />
                    {e.student} học viên
                  </div>
                </div>
                <div className="process">
                  <div className="line">
                    <div className="rate" style={{ width: `${e.process}%` }} />
                  </div>
                  {e.process}%
                </div>
                <Link
                  to={coursePath}
                  className="btn overlay round btn-continue"
                >
                  Tiếp tục học
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyCourse;
