import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import {
    ListTodo,
    Clock3,
    LoaderCircle,
    CheckCircle2
} from "lucide-react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

import { getTasksApi } from "../services/taskService"
import { setTasks } from "../utils/taskSlice"

function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const tasks = useSelector(
        store => store.Task?.data || []
    )

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                setLoading(true)

                const response = await getTasksApi()

                if (response.success) {

                    dispatch(
                        setTasks(response.tasks || [])
                    )

                }

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch tasks"
                )

            } finally {

                setLoading(false)

            }
        }

        fetchTasks()

    }, [dispatch])


    const totalTasks = tasks.length

    const pendingTasks = useMemo(() => {
        return tasks.filter(
            task => task.status === "Pending"
        ).length
    }, [tasks])

    const inProgressTasks = useMemo(() => {
        return tasks.filter(
            task => task.status === "In Progress"
        ).length
    }, [tasks])

    const completedTasks = useMemo(() => {
        return tasks.filter(
            task => task.status === "Completed"
        ).length
    }, [tasks])


    const recentTasks = tasks.slice(0, 5)


    const getStatusClass = (status) => {

        if (status === "Completed") {
            return "bg-green-100 text-green-700"
        }

        if (status === "In Progress") {
            return "bg-blue-100 text-blue-700"
        }

        return "bg-yellow-100 text-yellow-700"
    }


    const getPriorityClass = (priority) => {

        if (priority === "High") {
            return "bg-red-100 text-red-700"
        }

        if (priority === "Medium") {
            return "bg-orange-100 text-orange-700"
        }

        return "bg-green-100 text-green-700"
    }


    return (
        <div className="min-h-dvh bg-[#F5F6FA]">

            <Sidebar />

            <div className="md:ml-[240px] min-h-dvh">

                <Navbar />

                <main className="p-5 sm:p-8">

                    <div className="max-w-7xl mx-auto">

                        {/* Header */}

                        <div className="mb-7">

                            <h2 className="text-2xl font-extrabold text-[#1F2937]">
                                Welcome back!
                            </h2>

                            <p className="text-sm text-[#6B7280] mt-1">
                                Here's what's happening with your tasks.
                            </p>

                        </div>


                        {/* Statistics */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            {/* Total */}

                            <div className="bg-white rounded-xl border border-[#DDE3EA] p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <p className="text-sm font-semibold text-[#6B7280]">
                                        Total Tasks
                                    </p>

                                    <div className="w-9 h-9 rounded-lg bg-[#F7F8FF] text-[#0D0B61] flex items-center justify-center">
                                        <ListTodo size={18} />
                                    </div>

                                </div>

                                <h3 className="text-3xl font-extrabold text-[#0D0B61] mt-4">
                                    {loading ? "..." : totalTasks}
                                </h3>

                                <p className="text-xs text-[#6B7280] mt-2">
                                    All your tasks
                                </p>

                            </div>


                            {/* Pending */}

                            <div className="bg-white rounded-xl border border-[#DDE3EA] p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <p className="text-sm font-semibold text-[#6B7280]">
                                        Pending
                                    </p>

                                    <div className="w-9 h-9 rounded-lg bg-[#F7F8FF] text-[#478B8D] flex items-center justify-center">
                                        <Clock3 size={18} />
                                    </div>

                                </div>

                                <h3 className="text-3xl font-extrabold text-[#478B8D] mt-4">
                                    {loading ? "..." : pendingTasks}
                                </h3>

                                <p className="text-xs text-[#6B7280] mt-2">
                                    Tasks waiting
                                </p>

                            </div>


                            {/* In Progress */}

                            <div className="bg-white rounded-xl border border-[#DDE3EA] p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <p className="text-sm font-semibold text-[#6B7280]">
                                        In Progress
                                    </p>

                                    <div className="w-9 h-9 rounded-lg bg-[#F7F8FF] text-[#0D0B61] flex items-center justify-center">
                                        <LoaderCircle size={18} />
                                    </div>

                                </div>

                                <h3 className="text-3xl font-extrabold text-[#0D0B61] mt-4">
                                    {loading ? "..." : inProgressTasks}
                                </h3>

                                <p className="text-xs text-[#6B7280] mt-2">
                                    Currently working
                                </p>

                            </div>


                            {/* Completed */}

                            <div className="bg-white rounded-xl border border-[#DDE3EA] p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <p className="text-sm font-semibold text-[#6B7280]">
                                        Completed
                                    </p>

                                    <div className="w-9 h-9 rounded-lg bg-[#F7F8FF] text-[#478B8D] flex items-center justify-center">
                                        <CheckCircle2 size={18} />
                                    </div>

                                </div>

                                <h3 className="text-3xl font-extrabold text-[#478B8D] mt-4">
                                    {loading ? "..." : completedTasks}
                                </h3>

                                <p className="text-xs text-[#6B7280] mt-2">
                                    Finished tasks
                                </p>

                            </div>

                        </div>


                        {/* Recent Tasks */}

                        <div className="mt-7 bg-white rounded-xl border border-[#DDE3EA] shadow-sm">

                            <div className="p-5 sm:p-6 border-b border-[#DDE3EA] flex items-center justify-between gap-4">

                                <div>

                                    <h2 className="text-lg font-extrabold text-[#1F2937]">
                                        Recent Tasks
                                    </h2>

                                    <p className="text-xs text-[#6B7280] mt-1">
                                        Your latest tasks will appear here.
                                    </p>

                                </div>

                                <button
                                    onClick={() => navigate("/tasks")}
                                    className="
                                        px-4
                                        py-2
                                        rounded-md
                                        bg-[#0D0B61]
                                        hover:bg-[#100d7a]
                                        text-white
                                        text-sm
                                        font-bold
                                        transition
                                        shrink-0
                                    "
                                >
                                    View Tasks
                                </button>

                            </div>


                            {/* Loading */}

                            {loading && (

                                <div className="p-12 text-center">

                                    <div className="
                                        w-8
                                        h-8
                                        mx-auto
                                        border-4
                                        border-[#DDE3EA]
                                        border-t-[#0D0B61]
                                        rounded-full
                                        animate-spin
                                    " />

                                    <p className="text-sm text-[#6B7280] mt-4">
                                        Loading tasks...
                                    </p>

                                </div>

                            )}


                            {/* Empty */}

                            {!loading && recentTasks.length === 0 && (

                                <div className="p-10 text-center">

                                    <div className="
                                        w-14
                                        h-14
                                        mx-auto
                                        rounded-xl
                                        bg-[#F7F8FF]
                                        border
                                        border-[#DDE3EA]
                                        flex
                                        items-center
                                        justify-center
                                        text-[#0D0B61]
                                        font-extrabold
                                    ">
                                        TF
                                    </div>

                                    <h3 className="mt-4 text-base font-bold text-[#1F2937]">
                                        No tasks yet
                                    </h3>

                                    <p className="text-sm text-[#6B7280] mt-1">
                                        Create your first task to get started.
                                    </p>

                                    <button
                                        onClick={() => navigate("/tasks")}
                                        className="
                                            mt-5
                                            px-5
                                            py-2.5
                                            rounded-md
                                            bg-[#0D0B61]
                                            hover:bg-[#100d7a]
                                            text-white
                                            text-sm
                                            font-bold
                                            transition
                                        "
                                    >
                                        Create Task
                                    </button>

                                </div>

                            )}


                            {/* Tasks */}

                            {!loading && recentTasks.length > 0 && (

                                <div className="divide-y divide-[#DDE3EA]">

                                    {recentTasks.map(task => (

                                        <div
                                            key={task._id}
                                            className="
                                                p-5
                                                flex
                                                flex-col
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                                gap-4
                                                hover:bg-[#FAFBFD]
                                                transition
                                            "
                                        >

                                            <div className="min-w-0">

                                                <h3 className="text-sm font-bold text-[#1F2937] truncate">
                                                    {task.title}
                                                </h3>

                                                <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                                                    {task.description}
                                                </p>

                                            </div>


                                            <div className="flex items-center gap-2 shrink-0">

                                                <span
                                                    className={`
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-semibold
                                                        ${getStatusClass(task.status)}
                                                    `}
                                                >
                                                    {task.status}
                                                </span>

                                                <span
                                                    className={`
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-semibold
                                                        ${getPriorityClass(task.priority)}
                                                    `}
                                                >
                                                    {task.priority}
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    )
}

export default Dashboard