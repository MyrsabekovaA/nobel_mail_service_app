import * as react from "react";
import {
  createBrowserRouter,
  redirect,
  createHashRouter,
} from "react-router-dom";

//importing components
import LoginForm from "/@views/LoginForm/LoginForm";
import Home from "/@views/Home/Home";
import HomePage from "/@views/Home/HomePage/HomePage";
import Contacts from "/@views/Home/Contacts/Contacts";
import EmailTemplates from "/@views/Home/EmailTemplates/EmailTemplates";
import ContactDetails from "/@views/Home/Contacts/ContactDetails/ContactDetails";
import CreateEmailTemplateForm from "/@views/Home/EmailTemplates/CreateEmailTemplatesForm/CreateEmailTemplatesForm";
import EmailTemplatesDeletePopup from "/@views/Home/EmailTemplates/EmailTemplatesDeletePopup/EmailTemplatesDeletePopup";
import ViewEmailTemplatePopUp from "/@views/Home/EmailTemplates/ViewEmailTemplatePopUp/ViewEmailTemplatePopUp";

//importing loaders
import { emailTemplatesLoader } from "/@/loaders/EmailTemplates";
import LoginFormLoader from "./loaders/LogInForm";
//importing actions
import { loginAction } from "/@/actions/LogInForm";
import { deleteTemplate } from "/@/actions/EmailTemplates";
import AutomationPage from "./views/Home/AutomationPage/AutomationPage";
import ListsPage from "./views/Home/ListsPage/ListsPage";
import UnsubscribePage from "./views/UnsubscribePage/UnsubscribePage";
import IntakesPage from "./views/Home/IntakesPage/IntakesPage";

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
      path: "unsubscribe/:id",
      element: <UnsubscribePage />,
    },
    {
      path: "home",
      element: <Home />,
      children: [
        {
          path: "",
          index: true,
          element: <HomePage />,
        },
        {
          path: "contacts",
          element: <Contacts />,
        },
        {
          path: "automations",
          element: <AutomationPage />,
        },
        {
          path: "contacts/:contactid",
          element: <ContactDetails />,
        },
        {
          path: "lists",
          element: <ListsPage />,
        },
        {
          path: "intakes",
          element: <IntakesPage />,
        },
      ],
    },
  ],
  { basename: "/" }
);

export default router;
