import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async({page = 1, search = "", contactsPerPage = 50, checkedItems = {} }, {getState, rejectWithValue}) => {
    try {
      const token = getState().loggedIn.token;
      const headers = { Authorization: `Bearer ${token}` };

      let params = {};
  
      if (search || (checkedItems.eqLists && checkedItems.eqLists.length > 0)) {
        if (search) {
          params.search = search;
        }
        if (checkedItems.eqLists && checkedItems.eqLists.length > 0) {
          params.listIds = checkedItems.eqLists;
        }
      } else {
        params.pageSize = Number(contactsPerPage);
        params.page = Number(page);
      }
  
      const response = await axios.get(
        `https://mail-service-412008.ey.r.appspot.com/api/contacts`,
        {
          params: params,
          headers: headers,
        }
      );
      return {
        contacts: response.data.contacts,
        contactsCount: response.data.contactsCount,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    } 
  }
);

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
      contacts: [],
      totalContacts: 1000,
      totalPages: 0,
      contactsPerPage: 50,
      isLoading: false,
      isOverlayLoading: false,
      selectedContacts: []
    },
    reducers: {
      setContactsPerPage: (state, action) => {
        state.contactsPerPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // GET
        .addCase(fetchContacts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchContacts.fulfilled, (state, action) => {
          console.log(action.payload)
          state.contacts = action.payload.contacts;
          state.totalContacts = action.payload.contactsCount;
          state.totalPages = Math.ceil(action.payload.contactsCount / state.contactsPerPage); // / contactsPerPage
          state.isLoading = false;

        })
        .addCase(fetchContacts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })

  }
});
export const {setContactsPerPage} = contactsSlice.actions
export default contactsSlice.reducer