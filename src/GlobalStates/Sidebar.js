import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "Sidebar",
    initialState: {
        opened: false
    },
    reducers: {
        setTrueSidebarOpened: (state) => {
            state.opened = true;
        },
        setFalseSidebarOpened: (state) => {
            state.opened = false;
        },
        toggleSidebarOpened: (state) => {
            state.opened = !state.opened;
        }
    }
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice.reducer;