import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"

import { loginApi } from "../services/authService"
import { addUserData } from "../utils/userSlice"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {

            const response = await loginApi({
                email,
                password
            })

            if (response.success) {

                dispatch(addUserData(response.user))

                toast.success(response.message)

                setEmail("")
                setPassword("")

                navigate("/dashboard")
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-dvh bg-[#F5F6FA] flex items-center justify-center p-5">

            <div className="w-full max-w-[1050px] min-h-[620px] bg-white grid grid-cols-1 lg:grid-cols-[1fr_330px] rounded-2xl overflow-hidden border border-[#DDE3EA] shadow-[0_18px_50px_rgba(15,23,42,0.12)] animate-[pageFromBottom_0.6s_ease-out]">

                <div className="bg-white p-8 sm:p-12 lg:px-[60px] flex flex-col">

                    <div className="text-2xl font-extrabold text-[#0D0B61]">
                        Task<span className="text-[#478B8D]">Flow</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center">

                        <div className="w-full max-w-[360px] text-center">

                            <div className="w-[68px] h-[68px] mx-auto mb-3.5 rounded-[18px] bg-[#F7F8FF] border border-[#DDE3EA] flex items-center justify-center text-[#0D0B61] text-[23px] font-extrabold shadow-[0_10px_25px_rgba(13,11,97,0.08)]">
                                TF
                            </div>

                            <h1 className="text-[30px] sm:text-[34px] font-extrabold text-[#1F2937] mb-2">
                                Welcome back!
                            </h1>

                            <p className="text-sm text-[#6B7280] mb-7">
                                Login to manage your tasks
                            </p>

                            <form
                                onSubmit={submitHandler}
                                className="text-left"
                            >

                                <div className="mb-[17px]">

                                    <label className="block text-[13px] font-semibold text-[#6B7280] mb-1.5">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="w-full px-3.5 py-[13px] rounded-md border border-[#DDE3EA] outline-none text-sm text-[#1F2937] bg-white focus:border-[#0D0B61] focus:ring-4 focus:ring-[#0D0B61]/[0.08]"
                                    />

                                </div>

                                <div className="mb-[17px]">

                                    <div className="flex justify-between items-center mb-1.5">

                                        <label className="text-[13px] font-semibold text-[#6B7280]">
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            className="text-xs font-semibold text-[#478B8D] hover:text-[#0D0B61]"
                                        >
                                            Forgot password?
                                        </button>

                                    </div>

                                    <div className="relative">

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            className="w-full px-3.5 py-[13px] pr-16 rounded-md border border-[#DDE3EA] outline-none text-sm text-[#1F2937] bg-white focus:border-[#0D0B61] focus:ring-4 focus:ring-[#0D0B61]/[0.08]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#478B8D] hover:text-[#0D0B61]"
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-[13px] mt-1.5 rounded-md bg-[#0D0B61] hover:bg-[#100d7a] disabled:opacity-75 disabled:cursor-not-allowed text-white text-sm font-bold transition"
                                >

                                    {loading ? (

                                        <span className="flex justify-center items-center gap-2">

                                            <span className="w-[17px] h-[17px] border-2 border-white border-t-transparent rounded-full animate-spin" />

                                            Logging in...

                                        </span>

                                    ) : (

                                        "Log in"

                                    )}

                                </button>

                            </form>

                            <p className="text-sm text-[#6B7280] mt-6">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-[#478B8D] hover:text-[#0D0B61]"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

                <div className="hidden lg:flex relative overflow-hidden p-[50px_38px] bg-[#0D0B61] text-white flex-col justify-center">

                    <div className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(41,70,105,0.65)] -top-[120px] -right-[150px]" />

                    <div className="absolute w-[360px] h-[360px] rounded-full bg-[rgba(41,70,105,0.45)] -bottom-[170px] -left-[190px]" />

                    <div className="relative z-10">

                        <span className="inline-block px-3.5 py-2 rounded-full bg-white/[0.12] text-[#E4D329] text-[13px] font-bold mb-6">
                            TaskFlow
                        </span>

                        <h2 className="text-[34px] leading-[1.15] font-extrabold mb-4">
                            Organize your work in one place.
                        </h2>

                        <p className="text-[15px] leading-[1.7] text-white/75 mb-7">
                            Create tasks, manage priorities, and track your
                            daily progress using one clean dashboard.
                        </p>

                        <div className="flex flex-col gap-4">

                            {[
                                "Create and manage tasks",
                                "Track task progress",
                                "Manage your daily workflow"
                            ].map((text, index) => (

                                <div
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-white/[0.88]"
                                >

                                    <span className="w-[9px] h-[9px] rounded-full bg-[#E4D329] shrink-0" />

                                    {text}

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

            <style>
                {`
                    @keyframes pageFromBottom {
                        from {
                            opacity: 0;
                            transform: translateY(35px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>

        </div>
    )
}

export default Login