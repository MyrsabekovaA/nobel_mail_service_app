import * as react from "react"
import { createBrowserRouter, redirect, createHashRouter} from "react-router-dom";

//importing components
import LoginForm from "/@views/LoginForm/LoginForm";
import Home from "/@views/Home/Home";
import Contacts from "/@views/Home/Contacts/Contacts";
import EmailTemplates from "/@views/Home/EmailTemplates/EmailTemplates";

//importing loaders
import {emailTemplatesLoader} from "/@/loaders/EmailTemplates";
import LoginFormLoader from "./loaders/LogInForm";
//importing actions
import {loginAction} from "/@/actions/LogInForm";

import ContactsTable from "./views/Home/Contacts/ContactsTable/ContactsTable";
export const router = createBrowserRouter([
        {"path": "/",
        "exact": true,
        loader: ()=>{
            return redirect("/loginForm")
        }
        },
        {
            "path": "logInForm",
            "action" : loginAction,
            "loader": LoginFormLoader,
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
                    },
                    {
                        "path": "emailTemplates",
                        "element": <EmailTemplates/>,
                        "loader": emailTemplatesLoader
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