import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

import { getMeApi } from "../services/authService"
import { addUserData } from "../utils/userSlice"

import Loading from "../components/Loading"

function ProtectedRoute() {

    const userData = useSelector(
        store => store.User?.data
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (userData?._id) {
            setLoading(false)
            return
        }

        const getUserData = async () => {

            try {

                const response = await getMeApi()

                if (response.success) {

                    dispatch(
                        addUserData(response.user)
                    )

                }

            } catch (error) {

                navigate("/login")

            } finally {

                setLoading(false)

            }
        }

        getUserData()

    }, [userData?._id, dispatch, navigate])

    if (loading) {
        return <Loading text="Checking authentication..." />
    }


    return <Outlet />
}

export default ProtectedRoute