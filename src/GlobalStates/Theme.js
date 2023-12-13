import { createSlice } from "@reduxjs/toolkit";
const THEME_NAMES = ["dark", "light"]
export const themeSlice = createSlice({
    name: "Theme",
    initialState: {
      value: "dark"
    },
    reducers: {
      nextTheme: (state, action) => {
        let currentIndex = THEME_NAMES.indexOf(state.value)
        let nextIndex = (currentIndex+1)%THEME_NAMES.length
        state.value=THEME_NAMES[nextIndex]
      },
      setTheme: (state, action) => {
        state.value = action.payload.theme
      }
    }
});

export const themeActions = themeSlice.actions
export {THEME_NAMES}
export default themeSlice.reducer