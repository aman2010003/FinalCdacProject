import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 60 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Home;
