import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const loginApi = async (data) => {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        data,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const registerApi = async (data) => {
    const response = await axios.post(
        `${API_URL}/auth/register`,
        data,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const logoutApi = async () => {
    const response = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
            withCredentials: true
        }
    )

    return response.data
}

export const getMeApi = async () => {
    const response = await axios.get(
        `${API_URL}/auth/me`,
        {
            withCredentials: true
        }
    )

    return response.data
}