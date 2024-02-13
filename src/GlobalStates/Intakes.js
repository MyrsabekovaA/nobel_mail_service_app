import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";
import axios from "axios";

const initialState = {
   intakes: [],
   selectedIntake: {},
   isLoading: false,
   isLoadingOverlay: false,
   isEditModalOpen: false,
   page: 1,
   pageSize: 10,
   totalIntakes: 0,
   totalPages: 0,
};

export const fetchIntakes = createAsyncThunk(
   'intakes/fetchIntakes',
   async({page = 1, pageSize = 10, status}, {getState, rejectWithValue,dispatch}) => {
      try {
         let params = {}
         if (status) params.status = status
         if (page) params.page = page
         if(pageSize) params.pageSize = pageSize
         console.log(params)
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.get(`https://mail-service-412008.ey.r.appspot.com/api/intakes`, { headers: headers, params: params });

         if(response.status === 200) {
          console.log(response.data)  
         }
         return response.data;
      } catch (error) {
         dispatch(errorToast("Failed to fetch Intakes")); 
         return rejectWithValue(error.response.data);
      }
}) 

export const createIntake = createAsyncThunk(
   'intakes/createIntake',
   async({payload}, {getState, rejectWithValue, dispatch}) => {
      try {
         console.log(payload)
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.post(`https://mail-service-412008.ey.r.appspot.com/api/intakes`, payload, {headers})

         if(response.status === 201) {
            const { page, pageSize, status } = getState().intakes;

            dispatch(fetchIntakes(page, pageSize, status))
            dispatch(successToast("Intake created successfully"))
         }
         return response.data;
      } catch(error) {
         dispatch(errorToast("Failed to create Intakes")); 
         return rejectWithValue(error.response.data);
      }
   })
   
export const editIntake = createAsyncThunk(
   'intakes/editIntake',
   async({id, payload}, {getState, rejectWithValue, dispatch}) => {
      try {
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.put(`https://mail-service-412008.ey.r.appspot.com/api/intakes/${id}`, payload, {headers})

         if(response.status === 200) {
            const { page, pageSize, status } = getState().intakes;

            dispatch(fetchIntakes(page, pageSize, status))
            dispatch(successToast("Intake updated successfully!"))
         }
         return response.data;
      } catch(error) {
         dispatch(errorToast("Failed to update Intakes")); 
         return rejectWithValue(error.response.data);
      }

   })
export const deleteIntake = createAsyncThunk(
   'intakes/deleteIntake',
   async(id, {getState, rejectWithValue, dispatch}) => {
      try {
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.delete(`https://mail-service-412008.ey.r.appspot.com/api/intakes/${id}`, {headers})

         if(response.status === 204) {
            const { page, pageSize, status } = getState().intakes;

            dispatch(fetchIntakes(page, pageSize, status))
            dispatch(successToast("Intake deleted successfully!"))
         }
         return response.data;
      } catch(error) {
         dispatch(errorToast("Failed to delete Intakes")); 
         return rejectWithValue(error.response.data);
      }
   })

const intakesSlice = createSlice({
   name: 'intakes',
   initialState,
   reducers: {
      setSelectedIntake: (state, action) => {
         console.log(action.payload)
         state.selectedIntake = action.payload;
       },
      toggleModalEdit: (state) => {
         state.isEditModalOpen = !state.isEditModalOpen;
      },
      // toggleModalDelete: (state) => {
      //    state.isEditModalOpen = !state.isEditModalOpen;
      // },
      setCurrentPage: (state, action) => {
         state.page = action.payload
      },
      setIntakesPerPage: (state, action) => {
         state.pageSize = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
      // Handle loading state for fetchIntakes
      .addCase(fetchIntakes.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(fetchIntakes.fulfilled, (state, action) => {
         state.intakes = action.payload.intakes;
         state.totalIntakes = action.payload.intakesCount
         state.totalPages = Math.ceil(action.payload.intakesCount / state.pageSize)
         state.isLoading = false;
      })
      .addCase(fetchIntakes.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      })
      // create
      .addCase(createIntake.pending, (state) => {
         state.isLoadingOverlay = true;
      })
      .addCase(createIntake.fulfilled, (state, action) => {
         state.isLoadingOverlay = false;
      })
      .addCase(createIntake.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoadingOverlay = false;
      })
      // update
      .addCase(editIntake.pending, (state) => {
         state.isLoadingOverlay = true;
      })
      .addCase(editIntake.fulfilled, (state, action) => {
         state.isLoadingOverlay = false;
      })
      .addCase(editIntake.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoadingOverlay = false;
      })
      // delete
      .addCase(deleteIntake.pending, (state) => {
         state.isLoadingOverlay = true;
      })
      .addCase(deleteIntake.fulfilled, (state, action) => {
         state.isLoadingOverlay = false;
      })
      .addCase(deleteIntake.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoadingOverlay = false;
      })
   }
})

export const { setSelectedIntake, toggleModalEdit, setCurrentPage, setIntakesPerPage} = intakesSlice.actions;

export default intakesSlice.reducer