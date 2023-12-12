import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import sidebarReducer from "/@/GlobalStates/Sidebar"
import contactsReducer from "/@/GlobalStates/Contacts"
import languageSlice from "/@/GlobalStates/Language"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        sidebar: sidebarReducer,
        contacts: contactsReducer,
        language: languageSlice
    },
})



export default store