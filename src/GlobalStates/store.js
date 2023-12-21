import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import sidebarReducer from "/@/GlobalStates/Sidebar"
import contactsReducer from "/@/GlobalStates/Contacts"
import languageSlice from "/@/GlobalStates/Language"
import darkModeReducer from "/@/GlobalStates/DarkMode"
import taskReducer from "/@/GlobalStates/tasksSlice"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        sidebar: sidebarReducer,
        contacts: contactsReducer,
        language: languageSlice,
        darkMode: darkModeReducer,
        tasks: taskReducer,
    },
})

export default store