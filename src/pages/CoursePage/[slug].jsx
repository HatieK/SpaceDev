import React, { useState } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import { courseService } from "../../services/course";
import { PATH } from "../../config/path";
import { useScrollTop } from "../../hooks/useScrollTop";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useFetch } from "../../hooks/useFetch";
import CourseCard from "../../components/CourseCard";
import Skeleton from "../../components/Skeleton";
import { Accordion } from "../../components/Accordian";
import moment from "moment/moment";
import Teacher from "../../components/Teacher";
import PageNotFound from "../PageNotFound";
import VideoModal from "../../components/VideoModal";

const CourseDetail = () => {
  const { id } = useParams();

  const [isOpenVideo, setIsOpenVideo] = useState(false);

  useScrollTop([id]);

  const { data, loading } = useFetch(
    () => courseService.getCourseDetail(id),
    [id]
  );
  const { data: relatedCourses, loading: relatedLoading } = useFetch(
    () => courseService.getRelated(id),
    [id]
  );

  if (loading) {
    return (
      <main id="main" className="course-detail">
        <div style={{ margin: "100px 0" }}>
          <section
            className="banner style2"
            style={{ "--background": "#cde6fb" }}
          >
            <div className="container">
              <div className="info">
                <h1>
                  <Skeleton width={400} height={64} />
                </h1>
                <div className="row">
                  <div className="date">
                    <Skeleton width={200} height={24} />
                  </div>
                  <div className="time">
                    <Skeleton width={200} height={24} />
                  </div>
                </div>
                <Skeleton style={{ marginTop: 40 }} width={150} height={46} />
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const { data: detail } = data;

  if (!detail) {
    return <PageNotFound />;
  }

  const registerPath = generatePath(PATH.courseRegister, {
    slug: detail?.slug,
    id: detail?.id,
  });

  const openingTime = moment(detail.opening_time).format("DD/MM/YYYY");

  return (
    <main id="main">
      <div className="course-detail">
        <section
          className="banner style2"
          style={{ "--background": detail.template_color_banner || "#cde6fb" }}
        >
          <div className="container">
            <div className="info">
              <h1>{detail.title}</h1>
              <div className="row">
                <div className="date">
                  <strong>Khai giảng:</strong>
                  {openingTime}
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
              </div>
              <Link
                to={registerPath}
                className="btn white round"
                style={{ "--color-btn": "#70b6f1" }}
              >
                đăng ký
              </Link>
            </div>
          </div>
          <div className="bottom">
            <div className="container">
              <div className="video" onClick={() => setIsOpenVideo(true)}>
                <div className="icon">
                  <img src="/img/play-icon-white.png" alt />
                </div>{" "}
                <span>giới thiệu</span>
              </div>
              <VideoModal
                visible={isOpenVideo}
                maskOverlayClose
                onCancel={() => setIsOpenVideo(false)}
              >
                <iframe
                  width="800"
                  height="400"
                  src="https://www.youtube.com/embed/oTsopKtMS_0?si=R9U3_EuR0DQfoScA"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </VideoModal>

              <div className="money">{formatCurrency(detail.money)}</div>
            </div>
          </div>
        </section>
        <section className="section-2">
          <div className="container">
            <p className="des">{detail.long_description}</p>
            <h2 className="title">giới thiệu về khóa học</h2>
            <div className="cover">
              <img src="/img/course-detail-img.png" alt />
            </div>
            <h3 className="title">nội dung khóa học</h3>
            <Accordion.Group>
              {detail.content.map((element, index) => (
                <Accordion key={index} date={index + 1} {...element}>
                  {element.content}
                </Accordion>
              ))}
            </Accordion.Group>
            <h3 className="title">yêu cầu cần có</h3>
            <div className="row row-check">
              {detail.required.map((e, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    {e.content}
                  </div>
                );
              })}
            </div>
            <h3 className="title">hình thức học</h3>
            <div className="row row-check">
              {detail.benefits.map((e, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    {e.content}
                  </div>
                );
              })}
            </div>
            <h3 className="title">
              <div className="date-start">lịch học</div>
              <div className="sub">
                *Lịch học và thời gian có thể thống nhất lại theo số đông học
                viên.
              </div>
            </h3>
            <p>
              <strong>Ngày bắt đầu: </strong> {openingTime} <br />
              <strong>Thời gian học: </strong> {detail.schedule}
            </p>
            <h3 className="title">Người dạy</h3>
            <div className="teaches">
              <Teacher {...detail.teacher} />
            </div>

            {detail.mentor.length > 0 && (
              <>
                <h3 className="title">Người hướng dẫn</h3>
                <div className="teaches">
                  {detail.mentor.map((e) => {
                    return <Teacher key={e.id} {...e} />;
                  })}
                </div>
              </>
            )}

            <div className="bottom">
              <div className="user">
                <img src="/img/user-group-icon.png" alt /> 12 bạn đã đăng ký
              </div>
              <Link className="btn main btn-register round" to={registerPath}>
                đăng ký
              </Link>
              <div className="btn-share btn overlay round btn-icon">
                <img src="/img/facebook.svg" alt />
              </div>
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="container">
            <div className="textbox">
              <h3 className="sub-title">Khóa học</h3>
              <h2 className="main-title">Liên quan</h2>
            </div>
            <div className="list row">
              {relatedCourses &&
                relatedCourses?.data?.map((course) => {
                  return <CourseCard key={course.id} {...course} />;
                })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CourseDetail;
