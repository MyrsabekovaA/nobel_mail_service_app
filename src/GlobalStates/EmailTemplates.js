import { template } from "@babel/core";
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
        const searchedId = action.payload.id
        let searchedTemplateIsSelected = state.selectedTemplates.some(template => template.id === searchedId)
        if(!searchedTemplateIsSelected) {
            state.selectedTemplates.push({id: action.payload.id, 
                                          name: action.payload.name,
                                          googleDriveFileId: action.payload.googleDriveFileId})
        }
      },
      emailTemplatesSelectedRemove: (state, action)=>{
        const searchedId = action.payload.id
        console.log(state.selectedTemplates.filter((template)=>{
            return template.id !== searchedId
        }))
        state.selectedTemplates = state.selectedTemplates.filter((template)=>{
            return template.id !== searchedId
        })
      },
      emailTemplatesSelectedRecordsReset: (state, action)=>{
        state.selectedIds = []
      }
    }
});

export const emailTemplatesActions = emailTemplatesSlice.actions
export default emailTemplatesSlice.reducer