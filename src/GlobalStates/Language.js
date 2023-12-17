import { createSlice } from "@reduxjs/toolkit";
import English from '/Flag_of_the_U.S..svg';
import Ukrainian from '/Flag_of_Ukraine.svg';

const LANGUAGE_IMG = {
    "English":  English,
    "Ukrainian":  Ukrainian
}

const languageSlice = createSlice({
    name: "Language",
    initialState: {
        value: "English",
        img: English
    },
    reducers: {
        setLanguage: (state, action) => {
            state.value = action.payload.language
        }
    }
})

export const languageActions = languageSlice.actions
export {LANGUAGE_IMG}
export default languageSlice.reducer