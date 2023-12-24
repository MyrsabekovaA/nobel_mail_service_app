import React from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";
import { useSelector } from "react-redux";

const NavMenu = (props)=>{
    let emailTemplatesPage = useSelector(state=>state.emailTemplates.page)
    return <div>
        <NavLink to="/home/contacts">Contacts</NavLink>
        <NavLink to={`/home/emailTemplates/${emailTemplatesPage}`}>Email templates</NavLink>
    </div>
}

export default NavMenu