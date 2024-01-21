import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import sidebarReducer from "/@/GlobalStates/Sidebar"
import contactsReducer from "/@/GlobalStates/Contacts"
import languageSlice from "/@/GlobalStates/Language"
import toastsSlice from "/@/GlobalStates/Toasts";
import emailTemplatesSlice from "/@/GlobalStates/EmailTemplates";
import darkModeReducer from "/@/GlobalStates/DarkMode";
import taskReducer from "/@/GlobalStates/tasksSlice"
import automationsSlice from "/@/GlobalStates/Automation"
import listsSlice from "/@/GlobalStates/Lists"
import templatesSlice from "/@/GlobalStates/Templates"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        sidebar: sidebarReducer,
        contacts: contactsReducer,
        language: languageSlice,
        darkMode: darkModeReducer,
        tasks: taskReducer,
        toasts: toastsSlice,
        emailTemplates: emailTemplatesSlice,
        automations: automationsSlice,
        lists: listsSlice,
        templates: templatesSlice,
    },
})

export default store