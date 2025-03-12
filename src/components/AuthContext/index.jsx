import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../services/auth";
import { message } from "antd";
import {
  clearToken,
  clearUser,
  getUser,
  setToken,
  setUser,
} from "../../utilities/token";
import { userServices } from "../../services/user";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, _setUser] = useState(getUser);
  const { state } = useLocation();

  useEffect(() => {
    setUser(user || null);
  }, [user]);

  const login = async (data) => {
    try {
      const response = await auth.login(data);

      if (response.data) {
        setToken(response.data);
        await getProfile();
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error?.response?.data?.message);
      }
    }
  };

  const getProfile = async () => {
    const user = await userServices.getProfile();
    _setUser(user.data);
    message.success("Đăng Nhập Thành Công");
    if (state?.redirect) {
      console.log("Navigating to:", "/register/react-js/5");
      console.log("🚀---->", state?.redirect);
      navigate(state?.redirect);
    } else {
      console.log("🚀44444---->", 44444);
      navigate(PATH.profile.index);
    }
  };

  const logout = () => {
    clearToken();
    _setUser();
    message.success("Logout Success");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser: _setUser, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
