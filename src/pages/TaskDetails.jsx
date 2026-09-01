import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import {
    ArrowLeft,
    CalendarDays,
    CircleCheck,
    Clock3,
    LoaderCircle
} from "lucide-react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { getTaskByIdApi } from "../services/taskService"

function TaskDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchTask = async () => {

            try {

                setLoading(true)

                const response = await getTaskByIdApi(id)

                if (response.success) {
                    setTask(response.task)
                }

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch task"
                )

            } finally {
                setLoading(false)
            }
        }

        fetchTask()

    }, [id])

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

                    <div className="max-w-4xl mx-auto">

                        <button
                            onClick={() => navigate("/tasks")}
                            className="flex items-center gap-2 text-sm font-semibold text-[#0D0B61] hover:underline mb-6"
                        >
                            <ArrowLeft size={18} />
                            Back to Tasks
                        </button>

                        {loading && (

                            <div className="bg-white rounded-xl border border-[#DDE3EA] p-12 text-center">

                                <div className="w-8 h-8 mx-auto border-4 border-[#DDE3EA] border-t-[#0D0B61] rounded-full animate-spin" />

                                <p className="text-sm text-[#6B7280] mt-4">
                                    Loading task...
                                </p>

                            </div>

                        )}

                        {!loading && !task && (

                            <div className="bg-white rounded-xl border border-[#DDE3EA] p-12 text-center">

                                <h2 className="text-lg font-bold text-[#1F2937]">
                                    Task not found
                                </h2>

                                <p className="text-sm text-[#6B7280] mt-2">
                                    The task may have been deleted or you may not have access to it.
                                </p>

                                <button
                                    onClick={() => navigate("/tasks")}
                                    className="mt-5 px-5 py-2.5 rounded-md bg-[#0D0B61] text-white text-sm font-bold"
                                >
                                    Back to Tasks
                                </button>

                            </div>

                        )}

                        {!loading && task && (

                            <div className="bg-white rounded-xl border border-[#DDE3EA] shadow-sm">

                                <div className="p-6 sm:p-8 border-b border-[#DDE3EA]">

                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                                        <div className="min-w-0">

                                            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] break-words">
                                                {task.title}
                                            </h1>

                                            <p className="text-sm text-[#6B7280] mt-2">
                                                Task details
                                            </p>

                                        </div>

                                        <div className="flex gap-2 shrink-0">

                                            <span
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(task.status)}`}
                                            >
                                                {task.status}
                                            </span>

                                            <span
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityClass(task.priority)}`}
                                            >
                                                {task.priority}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <div className="p-6 sm:p-8">

                                    <div>

                                        <h2 className="text-sm font-bold text-[#1F2937]">
                                            Description
                                        </h2>

                                        <p className="text-sm text-[#6B7280] mt-2 leading-7 whitespace-pre-wrap">
                                            {task.description}
                                        </p>

                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

                                        {task.dueDate && (

                                            <div className="p-4 rounded-lg bg-[#F7F8FF] border border-[#DDE3EA]">

                                                <div className="flex items-center gap-2 text-[#0D0B61]">

                                                    <CalendarDays size={18} />

                                                    <p className="text-sm font-semibold">
                                                        Due Date
                                                    </p>

                                                </div>

                                                <p className="text-sm font-bold text-[#1F2937] mt-2">
                                                    {new Date(
                                                        task.dueDate
                                                    ).toLocaleDateString()}
                                                </p>

                                            </div>

                                        )}

                                        <div className="p-4 rounded-lg bg-[#F7F8FF] border border-[#DDE3EA]">

                                            <div className="flex items-center gap-2 text-[#0D0B61]">

                                                {task.status === "Completed" ? (
                                                    <CircleCheck size={18} />
                                                ) : task.status === "In Progress" ? (
                                                    <LoaderCircle size={18} />
                                                ) : (
                                                    <Clock3 size={18} />
                                                )}

                                                <p className="text-sm font-semibold">
                                                    Status
                                                </p>

                                            </div>

                                            <p className="text-sm font-bold text-[#1F2937] mt-2">
                                                {task.status}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-8 pt-6 border-t border-[#DDE3EA] flex flex-wrap gap-3">

                                        <button
                                            onClick={() => navigate(-1)}
                                            className="px-5 py-2.5 rounded-md border border-[#DDE3EA] text-sm font-semibold text-[#1F2937] hover:bg-[#F5F6FA]"
                                        >
                                            Back
                                        </button>

                                        <button
                                            onClick={() => navigate("/tasks", {
                                                state: {
                                                    editTask: task
                                                }
                                            })}
                                            className="px-5 py-2.5 rounded-md bg-[#0D0B61] hover:bg-[#100d7a] text-white text-sm font-bold"
                                        >
                                            Edit Task
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    )
}

export default TaskDetails