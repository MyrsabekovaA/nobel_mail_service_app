import { createSlice } from "@reduxjs/toolkit";
import English from '/Flag_of_the_U.S.png';
import Ukrainian from '/Flag_of_Ukraine.png';

const LANGUAGE_IMG = {
    "English":  English,
    "Ukrainian":  Ukrainian
}

const languageSlice = createSlice({
    name: "language",
    initialState: {
        value: "English",
        img: English
    },
    reducers: {
        setLanguage: (state, action) => {
            state.value = action.payload;
            state.img = LANGUAGE_IMG[action.payload];
        }
    }

})

export const languageActions = languageSlice.actions
export {LANGUAGE_IMG}
export default languageSlice.reducer