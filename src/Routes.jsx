import * as react from "react"
import LoginForm from "/@/LoginForm/LoginForm";
// import Loader from "/@/routesControll/loaders";
import Layout from '/@/components/Layout';
import Home from "/@/Home/Home";
import ContactList from "/@/Home/ContactList/ContactList";
import { createBrowserRouter, redirect, createHashRouter} from "react-router-dom"

export const router = createBrowserRouter([
    {
        "path": "/",
        "exact" : true,
        // "loader": Loader,
        "element": <LoginForm/>

    },
    {
        "path": "home",
        // "loader": Loader,
        "element": (<Layout>
            <Home />
        </Layout>),
        "children": [
            {
                "path": "",
                "index": true,
                "element": <div></div>
            },
            {
                "path": "contactList",
                "element": <ContactList/>
            }
        ]
    }
], {"basename": '/'})


export default router