import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
    name: "LoggedIn",
    initialState: {
      value: false
    },
    reducers: {
      setTrueLogIn: (state, action) => {
        state.value = true;
      },
      setFalseLogIn: (state, action) => {
        state.value = false
      },
      toggleLogIn: (state, action)=> {
        state.value = !state.value
      }
    }
});

export const isLoggedInActions = isLoggedInSlice.actions
export default isLoggedInSlice.reducer