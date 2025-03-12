import React from "react";
import { generatePath, Link } from "react-router-dom";
import { PATH } from "../../config/path";
import Skeleton from "../Skeleton";

const CourseCard = ({
  id,
  money,
  long_description,
  short_description,
  slug,
  title,
  thumbnailUrl,
}) => {
  const path = generatePath(PATH.courseDetail, {
    slug: slug,
    id: id,
  });

  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to={path}>
          <img
            src={
              thumbnailUrl ||
              "https://media.geeksforgeeks.org/wp-content/uploads/20240909153022/Best-React-JS-Courses-Online-with-Certificates.webp"
            }
            alt="Hình ảnh khóa học ReactJs"
          />
        </Link>
        <div className="info">
          <Link className="name" to={path}>
            {title}
          </Link>
          <p className="des">{short_description}</p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              <img src="/img/avt.png" alt />
            </div>
            <div className="name">Vương Đặng</div>
          </div>
          <Link to={path} className="register-btn">
            ĐĂNG KÝ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

export const CardLoading = () => {
  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to="#">
          <Skeleton height={310} />
        </Link>
        <div className="info">
          <Link className="name" to="#">
            <Skeleton height={30} />
          </Link>
          <p className="des">
            <Skeleton height={80} />
          </p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              <Skeleton height={36} width={36} shape="circle" />
            </div>
            <div className="name">
              <Skeleton height={24} width={150} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
