import AuthRouter from "../components/AuthRouter/index.jsx";
import { PATH } from "../config/path.js";
import MainLayout from "../layout/MainLayout.jsx";
import CoinPage from "../pages/CoinPage/index.jsx";
import ContactPage from "../pages/ContactPage/index.jsx";
import CourseDetail from "../pages/CoursePage/[slug].jsx";
import FaqPage from "../pages/FaqPage/index.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import PaymentPage from "../pages/PaymentPage/index.jsx";

import ProjectPage from "../pages/ProjectPage/index.jsx";
import RegisterPage from "../pages/RegisterPage/[slug]-id[id].jsx";
import ResetPassword from "../pages/ResetPage/index.jsx";
import SignInPage from "../pages/SignInPage/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";
import TeamPage from "../pages/TeamPage/index.jsx";
import PageNotFound from "../pages/PageNotFound/index.jsx";
import CoursePage from "../pages/CoursePage/index.jsx";
import { profile } from "./profile.jsx";
import DemoReact from "../pages/DemoReact.jsx";

export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },

      {
        element: <ContactPage />,
        path: PATH.contact,
      },
      {
        element: <DemoReact />,
        path: "/demo-react",
      },
      {
        path: PATH.course,
        children: [
          {
            element: <CoursePage />,
            index: true,
          },
          {
            element: <CourseDetail />,
            path: PATH.courseDetail,
          },
        ],
      },
      {
        element: <TeamPage />,
        path: PATH.team,
      },
      {
        element: <RegisterPage />,
        path: PATH.courseRegister,
      },
      {
        element: <ProjectPage />,
        path: PATH.project,
      },

      {
        element: <FaqPage />,
        path: PATH.faq,
      },
      {
        element: <PaymentPage />,
        path: PATH.payment,
      },
      {
        element: <CoinPage />,
        path: PATH.coin,
      },
      {
        element: <AuthRouter redirect={PATH.profile.index} />,
        children: [
          {
            element: <SignInPage />,
            path: PATH.signin,
          },
          {
            element: <SignUp />,
            path: PATH.signup,
          },
          {
            element: <ResetPassword />,
            path: PATH.resetpassword,
          },
        ],
      },
      {
        element: <PageNotFound />,
        path: "*",
      },
      profile(),
    ],
  },
];
