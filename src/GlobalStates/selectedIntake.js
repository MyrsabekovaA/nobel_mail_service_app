import { createSlice } from '@reduxjs/toolkit';
import { fetchIntakes } from '/@/GlobalStates/Intakes';

const selectedIntakeInitialState = {
    intakeId: null,
    intakes: [],
};

export const selectedIntakeSlice = createSlice({
    name: 'selectedIntake',
    initialState: selectedIntakeInitialState,
    reducers: {
        setSelectedIntakeId: (state, action) => {
            state.intakeId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIntakes.fulfilled, (state, action) => {
            state.intakes = action.payload;
            if (!state.intakeId && state.intakes.length > 0) {
                state.intakeId = state.intakes[0].id;
            }
        });
    },
});

export const { setSelectedIntakeId } = selectedIntakeSlice.actions;
export default selectedIntakeSlice.reducer;
