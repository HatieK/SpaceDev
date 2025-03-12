import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <Modal /> */}
    </>
  );
};

export default MainLayout;
