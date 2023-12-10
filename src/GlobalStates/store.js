import { configureStore } from "@reduxjs/toolkit";
import  isLoggedInReducer  from "/@/GlobalStates/LoggedIn"
import contactsReducer from "/@/GlobalStates/Contacts"

const store = configureStore({
    reducer: {
        loggedIn: isLoggedInReducer,
        contacts: contactsReducer
    },
})

export default store