import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const toastsSlice = createSlice({
  name: "toasts",
  initialState: {
  },
  reducers: {
    successToast: (state, action) => {
      toast.success(action.payload);
    },
    errorToast: (state, action) => {
      toast.error(action.payload);
    }
  },
});

export const { successToast, errorToast } = toastsSlice.actions;

export default toastsSlice.reducer;