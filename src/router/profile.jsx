import React from "react";
import { PATH } from "../config/path";
import ProfileLayout from "../layout/ProfileLayout";
import MyCourse from "../pages/Profile/MyCourse";
import MyProject from "../pages/Profile/MyProject";
import MyPayment from "../pages/Profile/MyPayment";
import MyCoin from "../pages/Profile/MyCoin";
import Profile from "../pages/Profile";
import PrivateRouter from "../components/PrivateRouter";

export const profile = (user) => {
  return {
    element: <PrivateRouter user={user} redirect={PATH.signin} />,
    children: [
      {
        element: <ProfileLayout user={user} />,
        children: [
          {
            element: <Profile />,
            path: PATH.profile.index,
          },
          {
            element: <MyCourse />,
            path: PATH.profile.course,
          },
          {
            element: <MyProject />,
            path: PATH.profile.project,
          },
          {
            element: <MyPayment />,
            path: PATH.profile.payment,
          },
          {
            element: <MyCoin />,
            path: PATH.profile.coin,
          },
        ],
      },
    ],
  };
};
