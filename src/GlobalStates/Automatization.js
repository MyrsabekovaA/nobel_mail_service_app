import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    automatizations: [],
    isLoading: false,
};

export const fetchAutomatizations = createAsyncThunk(
    'automatizations/fetchAutomatizations',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().loggedIn.token;
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get('http://52.59.202.2:3000/api/mailing-automations', { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAutomatizations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAutomatizations.fulfilled, (state, action) => {
                state.automatizations = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAutomatizations.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
        }
});

export const { updateAutomatizations, addAutomatization,  deleteAutomatization, copyAutomatization } = automatizationSlice.actions;
export default automatizationSlice.reducer
