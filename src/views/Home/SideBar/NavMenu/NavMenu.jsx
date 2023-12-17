import React from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";

const NavMenu = (props)=>{
    return <div>
        <NavLink to="/home/contacts">Contacts</NavLink>
        <NavLink to="/home/emailTemplates">Email templates</NavLink>
    </div>
}

export default NavMenu