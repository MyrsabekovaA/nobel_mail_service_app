import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import sidebarReducer from "/@/GlobalStates/Sidebar"
import contactsReducer from "/@/GlobalStates/Contacts"
import languageSlice from "/@/GlobalStates/Language"
import themeSlice from "/@/GlobalStates/Theme";
import toastsSlice from "/@/GlobalStates/Toasts";

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        sidebar: sidebarReducer,
        contacts: contactsReducer,
        language: languageSlice,
        theme: themeSlice,
        toasts: toastsSlice,

    },
})



export default store