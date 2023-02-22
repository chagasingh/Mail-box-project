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
        }
    }
})


export const mailActions = mailSlice.actions

export default mailSlice