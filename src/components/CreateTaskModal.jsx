import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

import {
    createTaskApi,
    updateTaskApi
} from "../services/taskService"

import {
    addTask,
    updateTask
} from "../utils/taskSlice"

function CreateTaskModal({ onClose, editTask = null }) {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("Pending")
    const [priority, setPriority] = useState("Medium")
    const [dueDate, setDueDate] = useState("")
    const [loading, setLoading] = useState(false)

    const isEdit = Boolean(editTask)

    useEffect(() => {

        if (editTask) {

            setTitle(editTask.title || "")
            setDescription(editTask.description || "")
            setStatus(editTask.status || "Pending")
            setPriority(editTask.priority || "Medium")

            setDueDate(
                editTask.dueDate
                    ? new Date(editTask.dueDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
            )

        }

    }, [editTask])

    const submitHandler = async (e) => {

        e.preventDefault()

        setLoading(true)

        try {

            const data = {
                title,
                description,
                status,
                priority,
                dueDate: dueDate || null
            }

            if (isEdit) {

                const response = await updateTaskApi(
                    editTask._id,
                    data
                )

                if (response.success) {

                    dispatch(
                        updateTask(response.task)
                    )

                    toast.success(response.message)

                    onClose()
                }

            } else {

                const response = await createTaskApi(data)

                if (response.success) {

                    dispatch(
                        addTask(response.task)
                    )

                    toast.success(response.message)

                    onClose()
                }

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
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">

            <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl">

                <div className="flex items-center justify-between px-6 py-5 border-b border-[#DDE3EA]">

                    <div>

                        <h2 className="text-xl font-extrabold text-[#1F2937]">
                            {isEdit ? "Edit Task" : "Create Task"}
                        </h2>

                        <p className="text-xs text-[#6B7280] mt-1">
                            {isEdit
                                ? "Update your task details."
                                : "Add a new task to your workflow."
                            }
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F5F6FA]"
                    >
                        <X size={20} />
                    </button>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="p-6"
                >

                    <div className="mb-4">

                        <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                            className="w-full px-3.5 py-3 rounded-lg border border-[#DDE3EA] outline-none text-sm focus:border-[#0D0B61] focus:ring-4 focus:ring-[#0D0B61]/[0.08]"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                            Description
                        </label>

                        <textarea
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows={4}
                            required
                            className="w-full px-3.5 py-3 rounded-lg border border-[#DDE3EA] outline-none text-sm resize-none focus:border-[#0D0B61] focus:ring-4 focus:ring-[#0D0B61]/[0.08]"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="w-full px-3.5 py-3 rounded-lg border border-[#DDE3EA] outline-none text-sm bg-white"
                            >
                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                                className="w-full px-3.5 py-3 rounded-lg border border-[#DDE3EA] outline-none text-sm bg-white"
                            >
                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="mt-4">

                        <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                            className="w-full px-3.5 py-3 rounded-lg border border-[#DDE3EA] outline-none text-sm"
                        />

                    </div>

                    <div className="flex justify-end gap-3 mt-6">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg border border-[#DDE3EA] text-sm font-semibold text-[#374151] hover:bg-[#F5F6FA]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg bg-[#0D0B61] hover:bg-[#100d7a] text-white text-sm font-bold disabled:opacity-60"
                        >
                            {loading
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Task"
                                    : "Create Task"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateTaskModal