import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: {receivedMail: [], totalReceivedMail: 0},
    reducers: {
        updateReceivedMail(state, action) {
            state.receivedMail = action.payload
            state.totalReceivedMail = state.receivedMail.length
        }
    }
})