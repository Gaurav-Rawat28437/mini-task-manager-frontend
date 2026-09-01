import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "User",

    initialState: {
        data: null
    },

    reducers: {
        addUserData: (state, action) => {
            state.data = action.payload
        },

        removeUserData: (state) => {
            state.data = null
        }
    }
})

export const {
    addUserData,
    removeUserData
} = userSlice.actions

export default userSlice.reducer