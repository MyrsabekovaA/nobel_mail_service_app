import * as react from "react"
import LoginForm from "/@views/LoginForm/LoginForm";
import Home from "/@views/Home/Home";
import Contacts from "/@views/Home/Contacts/Contacts";
import { createBrowserRouter, redirect} from "react-router-dom";
import {loginAction} from "/@/actions/LogInForm"
import ContactsTable from "./views/Home/Contacts/ContactsTable/ContactsTable";

export const router = createBrowserRouter([
    {
        "path": "/",
        "exact" : true,
        "loader": ()=>{
            return redirect("/logInForm")
        }
    },
    {
        "path": "logInForm",
        "action" : loginAction,
        "element": (<LoginForm/>)
    },
    {
        "path": "home",
        "element": (<Home/>),
        "children": [
            {
                "path": "",
                "index": true,
                "element": <div></div>
            },
            {
                "path": "contacts",
                "element": <Contacts/>
            }
        ]
    },
    {
        "path": "contacts",
        "element": (<Contacts/>),
        // "children": [
        //     {
        //         "path": "",
        //         "index": true,
        //         "element": <div></div>
        //     },
        // ]
    },
], {"basename": '/'})


export default router