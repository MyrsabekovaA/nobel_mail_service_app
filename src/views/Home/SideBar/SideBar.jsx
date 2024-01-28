import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "/logo.png";
import NavMenu from "./NavMenu/NavMenu";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "/@/GlobalStates/Sidebar";
import SideBar from "./SideBar";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.opened);
  const sidebarRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("sidebar-opened", isSidebarOpen.toString());
  }, [isSidebarOpen]);

  useEffect(() => {
    const clickHandler = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        dispatch(sidebarActions.setFalseSidebarOpened());
      }
    };
    document.addEventListener("mousedown", clickHandler);
    return () => document.removeEventListener("mousedown", clickHandler);
  }, [isSidebarOpen, dispatch]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!isSidebarOpen || keyCode !== 27) return;
      dispatch(sidebarActions.setFalseSidebarOpened());
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 z-50 h-screen w-72 flex flex-col
            overflow-y-auto bg-lightgreen transition-transform duration-300 ease-in-out dark:bg-compdark ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
    >
      <div className="flex items-center justify-between px-4 py-6">
        <Link to="/home" className="logo">
          <div>
            <img src={Logo} alt="Logo" className="h-10 w-10" />
          </div>
        </Link>
        <button onClick={() => dispatch(sidebarActions.toggleSidebarOpened())}>
          <Icon icon="material-symbols:close" className="text-xl" />
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <NavMenu isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
