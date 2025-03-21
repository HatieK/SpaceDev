import React from "react";

const Teacher = ({ title, description, website, avatar }) => {
  return (
    <>
      <div className="teacher">
        <div className="avatar">
          <img src={avatar} alt />
        </div>
        <div className="info">
          <div className="name">{title}</div>
          <div className="title">
            Founder Spacedev &amp; Fullstack developer
          </div>
          <p className="intro">{description}</p>
          {website && (
            <p>
              <strong>Website:</strong>{" "}
              <a href="#" target="_blank">
                {website}
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Teacher;
