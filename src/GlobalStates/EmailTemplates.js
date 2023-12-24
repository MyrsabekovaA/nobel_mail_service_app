import { createSlice } from "@reduxjs/toolkit";

export const emailTemplatesSlice = createSlice({
    name: "EmailTemplates",
    initialState: {
      page: 1,
      selectedIds: []
    },
    reducers: {
      changeEmailTemplatesPage: (state, action)=>{
        console.log(`page: ${action.payload.page}`)
        if(action.payload.page>=1) {
            state.page = action.payload.page
        }
      },
      emailTemplatesSelectedIdsPush: (state, action)=>{
        if (state.selectedIds.includes(action.payload.id)){
            state.selectedIds.push(action.payload.id)
        }
      },
      emailTemplatesSelectedIdsReset: (state, action)=>{
        state.selectedIds = []
      }
    }
});

export const emailTemplatesActions = emailTemplatesSlice.actions
export default emailTemplatesSlice.reducer