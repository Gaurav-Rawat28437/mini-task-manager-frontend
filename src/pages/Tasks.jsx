import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

import Navbar from "../components/Navbar"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

import {
    getTasksApi,
    deleteTaskApi
} from "../services/taskService"

import {
    setTasks,
    deleteTask
} from "../utils/taskSlice"

import CreateTaskModal from "../components/CreateTaskModal"

function Tasks() {

    const dispatch = useDispatch()

    const tasks = useSelector(
        store => store.Task?.data || []
    )

    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(null)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editTask, setEditTask] = useState(null)

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [deleteTaskId, setDeleteTaskId] = useState(null)

    useEffect(() => {

        const getTasks = async () => {

            try {

                const response = await getTasksApi()

                if (response.success) {

                    dispatch(
                        setTasks(response.tasks)
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

        getTasks()

    }, [dispatch])


    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        const matchesStatus =
            statusFilter === "All" ||
            task.status === statusFilter

        return matchesSearch && matchesStatus

    })


    const handleDelete = async (id) => {

        try {

            setDeleteLoading(id)

            const response =
                await deleteTaskApi(id)

            if (response.success) {

                dispatch(
                    deleteTask(id)
                )

                toast.success(
                    response.message
                )

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete task"
            )

        } finally {

            setDeleteLoading(null)

        }

    }

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

            <Navbar />


            <main className="p-5 sm:p-8 max-w-[1200px] mx-auto">




                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mb-7
                ">

                    <div>

                        <h1 className="
                            text-2xl
                            font-extrabold
                            text-[#1F2937]
                        ">
                            My Tasks
                        </h1>

                        <p className="
                            text-sm
                            text-[#6B7280]
                            mt-1
                        ">
                            Manage and track all your tasks.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            setShowCreateModal(true)
                        }
                        className="
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
                        + Create Task
                    </button>

                </div>



                {!loading && tasks.length > 0 && (

                    <div className="
                        bg-white
                        rounded-xl
                        border
                        border-[#DDE3EA]
                        p-4
                        mb-5
                    ">

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                        ">




                            <input
                                type="text"
                                placeholder="Search tasks by title..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="
                                    flex-1
                                    px-4
                                    py-2.5
                                    rounded-lg
                                    border
                                    border-[#DDE3EA]
                                    outline-none
                                    text-sm
                                    focus:border-[#0D0B61]
                                    focus:ring-4
                                    focus:ring-[#0D0B61]/[0.08]
                                "
                            />



                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                                className="
                                    sm:w-[180px]
                                    px-4
                                    py-2.5
                                    rounded-lg
                                    border
                                    border-[#DDE3EA]
                                    outline-none
                                    text-sm
                                    bg-white
                                    focus:border-[#0D0B61]
                                "
                            >

                                <option value="All">
                                    All Status
                                </option>

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

                    </div>

                )}




                {loading ? (

                    <div className="
                        bg-white
                        rounded-xl
                        border
                        border-[#DDE3EA]
                        p-12
                        text-center
                    ">

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

                        <p className="
                            text-sm
                            text-[#6B7280]
                            mt-4
                        ">
                            Loading tasks...
                        </p>

                    </div>


                ) : tasks.length === 0 ? (



                    <div className="
                        bg-white
                        rounded-xl
                        border
                        border-[#DDE3EA]
                        p-12
                        text-center
                    ">

                        <div className="
                            w-16
                            h-16
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


                        <h2 className="
                            text-lg
                            font-bold
                            text-[#1F2937]
                            mt-5
                        ">
                            No tasks yet
                        </h2>


                        <p className="
                            text-sm
                            text-[#6B7280]
                            mt-1
                        ">
                            Create your first task to get started.
                        </p>


                        <button
                            onClick={() =>
                                setShowCreateModal(true)
                            }
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


                ) : filteredTasks.length === 0 ? (



                    <div className="
                        bg-white
                        rounded-xl
                        border
                        border-[#DDE3EA]
                        p-10
                        text-center
                    ">

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


                        <h2 className="
                            text-lg
                            font-bold
                            text-[#1F2937]
                            mt-4
                        ">
                            No matching tasks
                        </h2>


                        <p className="
                            text-sm
                            text-[#6B7280]
                            mt-1
                        ">
                            Try changing your search or status filter.
                        </p>


                        <button
                            onClick={() => {

                                setSearch("")
                                setStatusFilter("All")

                            }}
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
                            Clear Filters
                        </button>

                    </div>


                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-5
                    ">

                        {filteredTasks.map(task => (

                            <div
                                key={task._id}
                                className="
                                    bg-white
                                    rounded-xl
                                    border
                                    border-[#DDE3EA]
                                    p-5
                                    shadow-sm
                                "
                            >


                                {/* TASK HEADER */}

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                ">


                                    <div className="
                                        min-w-0
                                    ">

                                        <h2 className="
                                            text-lg
                                            font-bold
                                            text-[#1F2937]
                                            break-words
                                        ">
                                            {task.title}
                                        </h2>


                                        <p className="
                                            text-sm
                                            text-[#6B7280]
                                            mt-2
                                            leading-6
                                            break-words
                                        ">
                                            {task.description}
                                        </p>

                                    </div>


                                    {/* ACTION BUTTONS */}

                                    <div className="
                                        flex
                                        gap-2
                                        shrink-0
                                    ">


                                        <button
                                            onClick={() =>
                                                setEditTask(task)
                                            }
                                            className="
                                                px-3
                                                py-1.5
                                                rounded-md
                                                border
                                                border-[#DDE3EA]
                                                text-xs
                                                font-semibold
                                                text-[#0D0B61]
                                                hover:bg-[#F5F6FA]
                                            "
                                        >
                                            Edit
                                        </button>


                                        <button
                                            onClick={() => setDeleteTaskId(task._id)}
                                            disabled={
                                                deleteLoading ===
                                                task._id
                                            }
                                            className="
                                                px-3
                                                py-1.5
                                                rounded-md
                                                border
                                                border-red-200
                                                text-xs
                                                font-semibold
                                                text-red-600
                                                hover:bg-red-50
                                                disabled:opacity-50
                                            "
                                        >

                                            {deleteLoading ===
                                                task._id
                                                ? "Deleting..."
                                                : "Delete"}

                                        </button>

                                    </div>

                                </div>


                                <div className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                    mt-5
                                ">


                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${getStatusClass(
                                            task.status
                                        )}
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
                                            ${getPriorityClass(
                                            task.priority
                                        )}
                                        `}
                                    >
                                        {task.priority}
                                    </span>

                                </div>




                                {task.dueDate && (

                                    <div className="
                                        mt-4
                                        pt-4
                                        border-t
                                        border-[#DDE3EA]
                                    ">

                                        <p className="
                                            text-xs
                                            text-[#6B7280]
                                        ">
                                            Due Date
                                        </p>


                                        <p className="
                                            text-sm
                                            font-semibold
                                            text-[#1F2937]
                                            mt-1
                                        ">
                                            {new Date(
                                                task.dueDate
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}



                {showCreateModal && (

                    <CreateTaskModal
                        onClose={() =>
                            setShowCreateModal(false)
                        }
                    />

                )}



                {editTask && (

                    <CreateTaskModal
                        editTask={editTask}
                        onClose={() =>
                            setEditTask(null)
                        }
                    />

                )}

            </main>

            {deleteTaskId && (
                <DeleteConfirmModal
                    loading={deleteLoading === deleteTaskId}
                    onCancel={() => setDeleteTaskId(null)}
                    onConfirm={async () => {
                        await handleDelete(deleteTaskId)
                        setDeleteTaskId(null)
                    }}
                />
            )}

        </div>
    )
}

export default Tasks