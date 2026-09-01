import React, { useState } from "react"
import toast from "react-hot-toast"

import { updateTaskApi } from "../services/taskService"
import { updateTask } from "../utils/taskSlice"
import { useDispatch } from "react-redux"

function EditTaskModal({ task, onClose }) {

    const dispatch = useDispatch()

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const [priority, setPriority] = useState(task.priority)
    const [dueDate, setDueDate] = useState(
        task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : ""
    )

    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {

            const response = await updateTaskApi(task._id, {
                title,
                description,
                status,
                priority,
                dueDate: dueDate || null
            })

            if (response.success) {

                dispatch(updateTask(response.task))

                toast.success(response.message)

                onClose()
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update task"
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">

            <div className="w-full max-w-[500px] bg-white rounded-xl shadow-xl">

                <div className="flex items-center justify-between p-5 border-b border-[#DDE3EA]">

                    <h2 className="text-lg font-bold text-[#1F2937]">
                        Edit Task
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-[#6B7280] hover:text-[#1F2937]"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="p-5"
                >

                    <div className="mb-4">

                        <label className="block text-sm font-semibold text-[#6B7280] mb-1.5">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 rounded-md border border-[#DDE3EA] outline-none text-sm focus:border-[#0D0B61] focus:ring-4 focus:ring-[#0D0B61]/[0.08]"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-semibold text-[#6B7280] mb-1.5">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows="4"
                            required
                            className="w-full px-3.5 py-2.5 rounded-md border border-[#DDE3EA] outline-none text-sm resize-none focus:border-[#0D0B61] focus:ring-4 focus:ring-[#0D0B61]/[0.08]"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-semibold text-[#6B7280] mb-1.5">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="w-full px-3.5 py-2.5 rounded-md border border-[#DDE3EA] outline-none text-sm"
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

                            <label className="block text-sm font-semibold text-[#6B7280] mb-1.5">
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
                                className="w-full px-3.5 py-2.5 rounded-md border border-[#DDE3EA] outline-none text-sm"
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

                        <label className="block text-sm font-semibold text-[#6B7280] mb-1.5">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                            className="w-full px-3.5 py-2.5 rounded-md border border-[#DDE3EA] outline-none text-sm"
                        />

                    </div>

                    <div className="flex justify-end gap-3 mt-6">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-md border border-[#DDE3EA] text-sm font-semibold text-[#6B7280] hover:bg-[#F5F6FA]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-md bg-[#0D0B61] hover:bg-[#100d7a] text-white text-sm font-bold disabled:opacity-60"
                        >
                            {loading
                                ? "Updating..."
                                : "Update Task"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditTaskModal
