import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "/@/GlobalStates/LoggedIn";

const store = configureStore({
    reducer: {
        isLoggedIn: isLoggedInReducer,
    },
});

export default store;
