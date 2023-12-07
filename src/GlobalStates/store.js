import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
    },
})

export default store