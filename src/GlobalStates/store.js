import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import sidebarReducer from "/@/GlobalStates/Sidebar"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        sidebar: sidebarReducer,
    },
})

export default store