import { createSlice } from "@reduxjs/toolkit"

const taskSlice = createSlice({
    name: "Task",

    initialState: {
        data: [],
        loading: false
    },

    reducers: {
        setTasks: (state, action) => {
            state.data = action.payload
        },

        addTask: (state, action) => {
            state.data.unshift(action.payload)
        },

        updateTask: (state, action) => {
            const index = state.data.findIndex(
                task => task._id === action.payload._id
            )

            if (index !== -1) {
                state.data[index] = action.payload
            }
        },

        deleteTask: (state, action) => {
            state.data = state.data.filter(
                task => task._id !== action.payload
            )
        },

        clearTasks: (state) => {
            state.data = []
        },

        setTaskLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    clearTasks,
    setTaskLoading
} = taskSlice.actions

export default taskSlice.reducer