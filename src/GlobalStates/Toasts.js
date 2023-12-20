import { createSlice } from "@reduxjs/toolkit";

export const toastsSlice = createSlice({
  name: "toasts",
  initialState: {
    message: '',
    type: null, // success, error, maybe something else
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { showToast } = toastsSlice.actions;

export default toastsSlice.reducer;