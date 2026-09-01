import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Menu } from "lucide-react"

import { logoutApi } from "../services/authService"
import { removeUserData } from "../utils/userSlice"
import ProfileDropdown from "./ProfileDropdown"
import ProfileModal from "./ProfileModal"

function Navbar() {

    const userData = useSelector(
        store => store.User?.data
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showProfile, setShowProfile] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const logoutHandler = async () => {

        try {

            const response = await logoutApi()

            dispatch(removeUserData())

            setShowProfile(false)

            toast.success(response.message)

            navigate("/login")

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Logout failed"
            )

        }
    }

    return (
        <header className="h-[72px] bg-white border-b border-[#DDE3EA] flex items-center justify-between px-5 sm:px-8">

            <div className="flex items-center gap-4">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="md:hidden text-[#0D0B61]"
                >
                    <Menu size={22} />
                </button>

                <div
                    onClick={() => navigate("/dashboard")}
                    className="text-2xl font-extrabold text-[#0D0B61] cursor-pointer"
                >
                    Task<span className="text-[#478B8D]">
                        Flow
                    </span>
                </div>

                <div className="hidden md:block h-6 w-px bg-[#DDE3EA]" />

                <h1 className="hidden md:block text-sm font-semibold text-[#6B7280]">
                    Dashboard
                </h1>

            </div>

            <div className="relative">

                <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="
                        flex
                        items-center
                        gap-3
                        px-2
                        py-1.5
                        rounded-xl
                        hover:bg-[#F5F6FA]
                        transition
                    "
                >

                    <div className="hidden sm:block text-right">

                        <p className="text-sm font-bold text-[#1F2937]">
                            {userData?.name}
                        </p>

                        <p className="text-xs text-[#6B7280]">
                            {userData?.email}
                        </p>

                    </div>

                    <div className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#0D0B61]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                    ">
                        {userData?.name
                            ?.charAt(0)
                            ?.toUpperCase()
                        }
                    </div>

                </button>

                {showProfile && (
                    <ProfileDropdown
                        userData={userData}
                        onLogout={logoutHandler}
                        onProfile={() => {
                            setShowProfile(false)
                            setShowProfileModal(true)
                        }}
                    />
                )}

            </div>

            {showProfileModal && (
                <ProfileModal
                    userData={userData}
                    onClose={() => setShowProfileModal(false)}
                />
            )}

        </header>
    )
}

export default Navbar