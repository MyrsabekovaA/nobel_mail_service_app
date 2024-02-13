import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";
import axios from "axios";

const initialState = {
   eqLists: [],
   isLoading: false,
   isLoadingForModal: false,
   isModalOpen: false,
   selectedListId: null,

};

export const fetchLists = createAsyncThunk(
   'lists/fetchLists',
   async(_, {getState, rejectWithValue}) => {
      try {
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.get(`https://mail-service-412008.ey.r.appspot.com/api/contacts-lists`, { headers });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
}) 

export const addToAutomation = createAsyncThunk(
   'lists/addToAutomation',
   async (automationId, { getState, dispatch, rejectWithValue }) => {
      try {
         const selectedListId = getState().lists.selectedListId;
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };

         const payload = { 
            listId: selectedListId,
            mailingAutomationId: automationId,
         };

         const response = await axios.post(`https://mail-service-412008.ey.r.appspot.com/api/contacts-lists/add-to-automation`, 
         payload, 
         { headers: headers });

         if(response.status === 200) {
             dispatch(successToast("Successfully added to automation")); 
         }

         return response.data;
     } catch (error) {
          dispatch(errorToast("Failed to add to automation")); 
         return rejectWithValue(error.response.data);
     }
   }
 );

const listsSlice = createSlice({
   name: 'lists',
   initialState,
   reducers: {
      setSelectedListId: (state, action) => {
         state.selectedListId = action.payload;
       },
      toggleModal: (state) => {
         state.isModalOpen = !state.isModalOpen;
      },
   },
   extraReducers: (builder) => {
      builder
        // Handle loading state for fetchLists
      .addCase(fetchLists.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
         state.eqLists = action.payload;
         state.isLoading = false;
      })
      .addCase(fetchLists.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      })
        // Handle loading state for addToAutomation
      .addCase(addToAutomation.pending, (state) => {
         state.isLoadingForModal = true;
      })
      .addCase(addToAutomation.fulfilled, (state) => {
         state.isLoadingForModal = false;
      })
      .addCase(addToAutomation.rejected, (state) => {
         state.isLoadingForModal = false;
      });
   }
})
export const { toggleModal, setSelectedListId } = listsSlice.actions;

export default listsSlice.reducer
