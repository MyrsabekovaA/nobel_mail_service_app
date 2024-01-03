import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { checkToken, isLoggedInActions } from "/@/GlobalStates/LoggedIn";
import store from "/@/GlobalStates/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sidebarActions } from "/@/GlobalStates/Sidebar";
import Loader from "/@/routesControll/loaders";

function Home() {
  const location = useLocation();
  const isLoading = useSelector((state) => state.loggedIn.isLoading);
  let isLoggedIn = useSelector((state) => state.loggedIn.value);
  const isDarkModeEnabled = useSelector((state) => state.darkMode.enabled);
  const [showLoader, setShowLoader] = useState(isLoading);
  useEffect(() => {
    let { dispatch } = store;
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    dispatch(checkToken({ token, user: { name, email } }));
    dispatch(isLoggedInActions.setLastRoute({ route: location.pathname }));
    // if (isLoading) {
    //     setShowLoader(true);
    // } else {
    //     const timer = setTimeout(() => setShowLoader(false), 1000);
    //     return () => clearTimeout(timer);
    // }
    // isLoading
  }, [location]);
  let sidebarOpenned = useSelector((state) => state.sidebar.openned);
  if (showLoader) {
    return <Loader />;
  }
  if (!isLoggedIn) {
    return <Navigate to="/LogInForm" />;
  }

  console.log(isLoggedIn);
  return (
    <div className={`${isDarkModeEnabled ? "dark" : ""} h-full`}>
      <Sidebar />
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1 h-screen pt-28 bg-whiten dark:bg-compdark">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
