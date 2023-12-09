import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState: false,
    reducers: {
        logIn: state => true,
        logOut: state => false,
    },
});
export const { logIn,  logOut } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;