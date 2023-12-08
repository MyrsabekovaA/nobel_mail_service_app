import * as react from "react"
import { createBrowserRouter, redirect, createHashRouter} from "react-router-dom";

//importing components
import LoginForm from "/@/LoginForm/LoginForm";
import Home from "/@/Home/Home";
import ContactList from "/@/Home/ContactList/ContactList";
import EmailTemplates from "/@/Home/EmailTemplates/EmailTemplates";

//importing loaders
import {emailTemplatesLoader} from "/@/routesControll/loaders"
//importing actions

export const router = createBrowserRouter([
    {
        "path": "/",
        "exact" : true,
        "loader": ()=>{
            return redirect("/home/emailTemplates")
        }
    },
    {
        "path": "logInForm",
        //action
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
                "path": "contactList",
                "element": <ContactList/>
            },
            {
                "path": "emailTemplates",
                "element": <EmailTemplates/>,
                "loader": emailTemplatesLoader
            }
        ]
    }
], {"basename": '/'})


export default router