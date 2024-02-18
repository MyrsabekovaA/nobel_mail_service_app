import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: {},
    isLoading: false,
    error: null,
};

export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async (intakeId, { getState, rejectWithValue }) => {
        try {
            const token = getState().loggedIn.token;
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`https://mail-service-412008.ey.r.appspot.com/api/intakes/${intakeId}/country-source-stats`, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default statisticsSlice.reducer;