import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: {receivedMail: [],sentMail: []},
    reducers: {
        updateReceivedMail(state, action) {
            state.receivedMail = action.payload.mail
            
        },
        updateSentMail(state, action) {
            state.sentMail = action.payload.mail
            
        },
        deleteReceivedMail(state, action) {
            const id = action.payload.id
            state.receivedMail = state.receivedMail.filter(mail => mail.id !== id)
        },
        viewMailHandle(state, action) {
            const newid = action.payload.id;
            const index = state.receivedMail.findIndex((mail) => mail.id === newid);
            state.receivedMail[index].isRead = true;
            state.viewMail = !state.viewMail;
          },
          mailHandler(state) {
            state.viewMail = !state.viewMail;   
          }
    }
})


export const mailActions = mailSlice.actions

export default mailSlice;