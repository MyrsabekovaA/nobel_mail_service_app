import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "Sidebar",
    initialState: {
      openned: false
    },
    reducers: {
      setTrueSidebarOpenned: (state, action) => {
        state.openned = true;
      },
      setFalseSidebarOpenned: (state, action) => {
        state.openned = false
      },
      toggleSidebarOpenned: (state, action)=> {
        state.openned = !state.openned
      }
    }
});

export const sidebarActions = sidebarSlice.actions
export default sidebarSlice.reducer