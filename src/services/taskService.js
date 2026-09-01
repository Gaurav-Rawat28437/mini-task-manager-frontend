import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getTasksApi = async () => {
    const response = await axios.get(
        `${API_URL}/tasks`,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const getTaskByIdApi = async (id) => {
    const response = await axios.get(
        `${API_URL}/tasks/${id}`,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const createTaskApi = async (taskData) => {
    const response = await axios.post(
        `${API_URL}/tasks/create`,
        taskData,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const updateTaskApi = async (id, taskData) => {
    const response = await axios.put(
        `${API_URL}/tasks/${id}`,
        taskData,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const deleteTaskApi = async (id) => {
    const response = await axios.delete(
        `${API_URL}/tasks/${id}`,
        {
            withCredentials: true
        }
    )

    return response.data
}