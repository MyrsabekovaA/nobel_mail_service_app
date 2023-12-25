import * as react from "react";
import {
  createBrowserRouter,
  redirect,
  createHashRouter,
} from "react-router-dom";

//importing components
import LoginForm from "/@views/LoginForm/LoginForm";
import Home from "/@views/Home/Home";
import Contacts from "/@views/Home/Contacts/Contacts";
import EmailTemplates from "/@views/Home/EmailTemplates/EmailTemplates";
import ContactDetails from "/@views/Home/Contacts/ContactDetails/ContactDetails";

//importing loaders
import { emailTemplatesLoader } from "/@/loaders/EmailTemplates";
import LoginFormLoader from "./loaders/LogInForm";
//importing actions
import { loginAction } from "/@/actions/LogInForm";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      exact: true,
      loader: () => {
        return redirect("/loginForm");
      },
    },
    {
      path: "logInForm",
      action: loginAction,
      loader: LoginFormLoader,
      element: <LoginForm />,
    },
    {
      path: "home",
      element: <Home />,
      children: [
        {
          path: "",
          index: true,
          element: <div></div>,
        },
        {
          path: "contacts",
          element: <Contacts />,
        },
        {
          path: "contacts/:contactid",
          element: <ContactDetails />,
        },
        {
          path: "emailTemplates/:pageNumber",
          element: <EmailTemplates />,
          loader: emailTemplatesLoader,
          children: [
            {
              path: "",
              index: true,
              element: <div></div>,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/" }
);

export default router;
