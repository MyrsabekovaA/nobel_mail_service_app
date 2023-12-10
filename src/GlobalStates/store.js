import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import sidebarReducer from "/@/GlobalStates/Sidebar"
import contactsReducer from "/@/GlobalStates/Contacts"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        sidebar: sidebarReducer,
        contacts: contactsReducer
    },
})



export default store