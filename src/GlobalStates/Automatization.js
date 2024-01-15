import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    automatizations: [],
};

const automatizationSlice = createSlice({
    name: 'automatizations',
    initialState,
    reducers: {
        updateAutomatizations: (state, action) => {
            state.automatizations = action.payload;
        },
        addAutomatization: (state) => {
            const newAutomatization = {
                id: 'temp-' + Date.now(),
                name: '',
                automationScheduledMails: [],
            };
            state.automatizations.push(newAutomatization);
        },
        deleteAutomatization: (state, action) => {
            const id = action.payload;
            state.automatizations = state.automatizations.filter(item => item.id !== id);
        },
        copyAutomatization: (state, action) => {
            const automatizationToCopy = action.payload;
            const copiedAutomatization = {
                ...automatizationToCopy,
                id: 'temp-' + Date.now(), // Assign a new id
                name: `Copy of ${automatizationToCopy.name}`,
            };
            state.automatizations.push(copiedAutomatization);
        },
    },
});

export const { updateAutomatizations, addAutomatization,  deleteAutomatization, copyAutomatization } = automatizationSlice.actions;
export default automatizationSlice.reducer
