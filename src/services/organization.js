import axios from "axios";
import { ORGANIZATION_API } from "../config/api";

export const organization = {
  contact(data) {
    return axios.post(`${ORGANIZATION_API}/contact`, data);
  },
};
