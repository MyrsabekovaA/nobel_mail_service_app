import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState: false,
    reducers: {
      changeTheme: (state, action) => {
        state.value.activeTheme = action.payload;
      }
    }
});