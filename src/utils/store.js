import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./userSlice"
import taskReducer from "./taskSlice"

const store = configureStore({
    reducer: {
        User: userReducer,
        Task: taskReducer
    }
})

export default store