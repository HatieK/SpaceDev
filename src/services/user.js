import { api, USER_API } from "../config/api";

export const userServices = {
  signup(data) {
    return api.post(`${USER_API}/register`, data);
  },
  getProfile() {
    return api.get(`${USER_API}`);
  },
  resendEmail(data) {
    return api.post(`${USER_API}/resend-email`, data);
  },
  updateInfo(data) {
    return api.patch(`${USER_API}`, data);
  },
  sendEmailResetPassword(data) {
    return api.post(`${USER_API}/reset-password`, data);
  },
  resetPasswordByCode(data) {
    return api.post(`${USER_API}/change-password-by-code`, data);
  },
};
