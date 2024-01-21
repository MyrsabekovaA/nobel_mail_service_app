import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";

const initialState = {
    automations: [],
    isLoading: false,
    isLoadingOverlay: false,
    isLoadingUpdate: false,
};

export const fetchAutomations = createAsyncThunk(
    'automations/fetchAutomations',
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

export const createAutomation = createAsyncThunk(
    'automations/createAutomation',
    async (_, {getState, rejectWithValue, dispatch }) => {
        try {
            const token = getState().loggedIn.token;
            const headers = { Authorization: `Bearer ${token}` };
            const payload = {
                name: 'New Automation',
                automationScheduledMails: [
                    {
                        "useContactTimezone": false,
                        "scheduledDate": new Date(),
                        "templateId": "656aea5e130538893e8820d0"
                    }
                ],
            }
            const response = await axios.post('http://52.59.202.2:3000/api/mailing-automations',
            payload,
            { headers });
            if(response.status === 201) {
                dispatch(successToast("Automation created successfully!"))
                await dispatch(fetchAutomations())
            }
            return response.data;
        } catch (error) {
            dispatch(errorToast("Error creating Automation."))
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteAutomation = createAsyncThunk(
    'automations/deleteAutomation',
    async(automationId, {getState, rejectWithValue, dispatch}) => {
        try {
            const token = getState().loggedIn.token;
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.delete(`http://52.59.202.2:3000/api/mailing-automations/${automationId}`, {headers})
            if(response.status === 204) {
                dispatch(successToast("Automation deleted!"))
                await dispatch(fetchAutomations())
            }
            return response.data
        } catch(error) {
            dispatch(errorToast("Failed deleting automation."))
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateAutomation = createAsyncThunk(
    'automations/updateAutomation',
    async({id, data}, {getState, rejectWithValue, dispatch}) => {
        try {
            const token = getState().loggedIn.token;
            const headers = { Authorization: `Bearer ${token}` };
            const transformedData = {
                ...data,
                automationScheduledMails: data.automationScheduledMails.map(({ template, mailingAutomationId, ...rest }) => rest)
              };
            const response = await axios.put(`http://52.59.202.2:3000/api/mailing-automations/${id}`,
            transformedData,
            { headers });
            if(response.status === 200) {
                dispatch(successToast("Automation updated successfully!"))
            }
            return response.data

        } catch(error) {
            dispatch(errorToast("Error updating automation."))
            return rejectWithValue(error.response.data)
        }
    }
)

const automationsSlice = createSlice({
    name: 'automations',
    initialState,
    reducers: {
        
        updateAutomations: (state, action) => {
            state.automations = action.payload;
        },
        addAutomation: (state) => {
            const newAutomation = {
                id: 'temp-' + Date.now(),
                name: '',
                automationScheduledMails: [],
            };
            state.automations.push(newAutomation);
        },
        // deleteAutomation: (state, action) => {
        //     const id = action.payload;
        //     state.automations = state.automations.filter(item => item.id !== id);
        // },
        copyAutomation: (state, action) => {
            const automationToCopy = action.payload;
            const copiedAutomation = {
                ...automationToCopy,
                id: 'temp-' + Date.now(), // Assign a new id
                name: `Copy of ${automationToCopy.name}`,
            };
            state.automations.push(copiedAutomation);
        },
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchAutomations.pending, (state) => {
                state.isLoadingOverlay = true;
            })
            .addCase(fetchAutomations.fulfilled, (state, action) => {
                state.automations = action.payload;
                state.isLoadingOverlay = false;
            })
            .addCase(fetchAutomations.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoadingOverlay = false;
            })
            // CREATE
            .addCase(createAutomation.pending, (state) => {
                state.isLoadingOverlay = true;
            })
            .addCase(createAutomation.fulfilled, (state, action) => {
                state.isLoadingOverlay = false;
            })
            .addCase(createAutomation.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoadingOverlay = false;
            })
            // DELETE
            .addCase(deleteAutomation.pending, (state) => {
                state.isLoadingOverlay = true;
            })
            .addCase(deleteAutomation.fulfilled, (state, action) => {
                state.isLoadingOverlay = false;
            })
            .addCase(deleteAutomation.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoadingOverlay = false;
            })
            // UPDATE
            .addCase(updateAutomation.pending, (state) => {
                state.isLoadingUpdate = true;
            })
            .addCase(updateAutomation.fulfilled, (state, action) => {
                state.isLoadingUpdate = false;
            })
            .addCase(updateAutomation.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoadingUpdate = false;
            })
}
});

export const { updateAutomations, addAutomation, copyAutomation } = automationsSlice.actions;
export default automationsSlice.reducer
