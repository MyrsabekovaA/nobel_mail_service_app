import { createSlice } from "@reduxjs/toolkit";

export const emailTemplatesSlice = createSlice({
    name: "EmailTemplates",
    initialState: {
      page: 1,
      selectedTemplates: []
    },
    reducers: {
      changeEmailTemplatesPage: (state, action)=>{
        console.log(`page: ${action.payload.page}`)
        if(action.payload.page>=1) {
            state.page = action.payload.page
        }
      },
      emailTemplatesSelectedPush: (state, action)=>{
        
      },
      templateIdIsSelected: (state, action)=>{
        const searchedId = action.payload.id
        const searchedTemplate = state.selectedIds
      },
      emailTemplatesSelectedRecordsReset: (state, action)=>{
        state.selectedIds = []
      }
    }
});

export const emailTemplatesActions = emailTemplatesSlice.actions
export default emailTemplatesSlice.reducer