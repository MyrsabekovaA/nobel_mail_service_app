import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";
import axios from "axios";

const initialState = {
   intakes: [],
   selectedIntake: {},
   isLoading: false,
   isEditModalOpen: false,
};

export const fetchIntakes = createAsyncThunk(
   'intakes/fetchIntakes',
   async(_, {getState, rejectWithValue,dispatch}) => {
      try {
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.get(`https://mail-service-412008.ey.r.appspot.com/api/intakes`, { headers });

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

         if(response.status === 200) {
            dispatch(successToast("Intake created successfully"))
            await dispatch(fetchIntakes())
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
         console.log(id)
         const token = getState().loggedIn.token;
         const headers = { Authorization: `Bearer ${token}` };
         const response = await axios.put(`https://mail-service-412008.ey.r.appspot.com/api/intakes/${id}`, payload, {headers})

         if(response.status === 200) {
            dispatch(successToast("Intake updated successfully"))
            await dispatch(fetchIntakes())
         }
         return response.data;
      } catch(error) {
         dispatch(errorToast("Failed to create Intakes")); 
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
      toggleModal: (state) => {
         state.isEditModalOpen = !state.isEditModalOpen;
      },
   },
   extraReducers: (builder) => {
      builder
      // Handle loading state for fetchIntakes
      .addCase(fetchIntakes.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(fetchIntakes.fulfilled, (state, action) => {
         state.intakes = action.payload;
         state.isLoading = false;
      })
      .addCase(fetchIntakes.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      })
      // create
      .addCase(createIntake.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(createIntake.fulfilled, (state, action) => {
         state.isLoading = false;
      })
      .addCase(createIntake.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      })
   }
})

export const { setSelectedIntake, toggleModal} = intakesSlice.actions;

export default intakesSlice.reducer