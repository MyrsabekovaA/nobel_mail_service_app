import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";
import axios from "axios";

const initialState = {
   templates: [],
   isLoading: false,
};

export const fetchTemplates = createAsyncThunk(
   'templates/fetchTemplates',
   async(_, {getState, rejectWithValue}) => {
      try {
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.get('https://mail-service-412008.ey.r.appspot.com/api/mail-templates', { headers });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
}) 

const templatesSlice = createSlice({
   name: 'templates',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder
        // Handle loading state for fetchLists
      .addCase(fetchTemplates.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
         state.templates = action.payload;
         state.isLoading = false;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      })
   }
})
// export const { } = listsSlice.actions;

export default templatesSlice.reducer
