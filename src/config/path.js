const PROFILE_PATH = "/profile";
const COURSE_PATH = "/course";

export const PATH = {
  home: "/",
  team: "/team",
  course: COURSE_PATH,
  courseDetail: COURSE_PATH + "/:slug/:id",
  courseRegister: "/register/:slug/:id",
  project: "/project",
  coin: "/coin",
  contact: "/contact",
  faq: "/faq",
  payment: "/payment",
  signin: "/sign-in",
  signup: "/sign-up",
  resetpassword: "/reset-password",
  profile: {
    index: PROFILE_PATH,
    course: PROFILE_PATH + COURSE_PATH,
    coin: PROFILE_PATH + "/coin",
    payment: PROFILE_PATH + "/payment",
    project: PROFILE_PATH + "/project",
  },
};
