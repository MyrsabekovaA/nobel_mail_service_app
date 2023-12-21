import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        isLoading: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        loginFailure: (state) => {
            state.isLoggedIn = false;
            state.isLoading = false;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;