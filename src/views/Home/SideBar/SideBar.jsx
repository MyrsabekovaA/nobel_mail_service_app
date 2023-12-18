import React, { useState } from "react";
import { sidebarActions } from "/@/GlobalStates/Sidebar";
import { Icon } from "@iconify/react";
import { Image } from "react-bootstrap";
import Logo from "/Nobel_logo.png";
import NavMenu from "./NavMenu/NavMenu";
import "./SideBar.css";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = (props) => {
  let sidebarOpenned = useSelector((state) => state.sidebar.openned);
  const toggleSidebar = sidebarActions.toggleSidebarOpenned;
  const dispatch = useDispatch();

  return (
    <div
      className={`relative bg-white-800 ${
        sidebarOpenned ? "w-70" : "w-24"
      } box-border shrink-0 h-full sidebar`}
    >
      <div>
        <div
          className={`flex items-center w-full justify-between`}
          style={{
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "30px",
          }}
        >
          <Image src={Logo} style={{ height: "40px", width: "40px" }} />

          {sidebarOpenned && (
            <button
              onClick={() => dispatch(toggleSidebar())}
              className=" text-xl text-white"
            >
              <Icon icon="material-symbols:close" color="black" />
            </button>
          )}
        </div>
        {sidebarOpenned && <NavMenu />}
      </div>
    </div>
  );
};

export default Sidebar;
