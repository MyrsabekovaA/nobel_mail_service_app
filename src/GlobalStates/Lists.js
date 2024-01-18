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
         const response = await axios.get('http://52.59.202.2:3000/api/contacts-lists', { headers });
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
}) 

export const addToAutomatization = createAsyncThunk(
   'lists/addToAutomatization',
   async (automatizationId, { getState, dispatch, rejectWithValue }) => {
      try {
         const selectedListId = getState().lists.selectedListId;
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const contactParams = {
            listIds: selectedListId
         };
         const contactsResponse = await axios.get(`http://52.59.202.2:3000/api/contacts`, 
         { 
            headers: headers, 
            params: contactParams 
         });

         const payload = { 
            contactIds: contactsResponse.data.contacts.map((contact) => contact.id)
         };

         const response = await axios.post(`http://52.59.202.2:3000/api/mailing-automations/${automatizationId}/add-contacts`, 
         payload, 
         { headers: headers });

         if(response.status === 200) {
             dispatch(successToast("Successfully added to automatization")); 
         }

         return response.data;
     } catch (error) {
          dispatch(errorToast("Failed to add to automatization")); 
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
        // Handle loading state for addToAutomatization
      .addCase(addToAutomatization.pending, (state) => {
         state.isLoadingForModal = true;
      })
      .addCase(addToAutomatization.fulfilled, (state) => {
         state.isLoadingForModal = false;
      })
      .addCase(addToAutomatization.rejected, (state) => {
         state.isLoadingForModal = false;
      });
   }
})
export const { toggleModal, setSelectedListId } = listsSlice.actions;

export default listsSlice.reducer
