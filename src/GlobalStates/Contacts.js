import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
    name: "Contacts",
    initialState: {
      page: 1,
      selected: [],
    },
    reducers: {
      contactsSelectPage: (state, action) => {
        state.page = action.payload.page;
      },
      contactsPushSelected: (state, action)=>{
        if (!state.selected.includes(action.payload.contact)) {
            state.selected.push(action.payload.contact)
        }
      }
    }
});

export const contactsActions = contactsSlice.actions
export default contactsSlice.reducer