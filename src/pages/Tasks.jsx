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
    const [sort, setSort] = useState("newest")

    
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPreviousPage, setHasPreviousPage] = useState(false)

    
    useEffect(() => {

        const getTasks = async () => {

            try {

                setLoading(true)

                const response = await getTasksApi(page, 5, sort)

                if (response.success) {

                    dispatch(
                        setTasks(response.tasks || [])
                    )

                    setTotalPages(
                        response.pagination?.totalPages || 1
                    )

                    setHasNextPage(
                        response.pagination?.hasNextPage || false
                    )

                    setHasPreviousPage(
                        response.pagination?.hasPreviousPage || false
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

    }, [dispatch, page,sort])


   
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


    /*
        Delete task
    */
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

                /*
                    If current page becomes empty
                    after deleting the last task,
                    move to previous page.
                */
                if (
                    tasks.length === 1 &&
                    page > 1
                ) {
                    setPage(prev => prev - 1)
                }

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


    /*
        Status badge classes
    */
    const getStatusClass = (status) => {

        if (status === "Completed") {
            return "bg-green-100 text-green-700"
        }

        if (status === "In Progress") {
            return "bg-blue-100 text-blue-700"
        }

        return "bg-yellow-100 text-yellow-700"

    }


    /*
        Priority badge classes
    */
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


                {/* Header */}

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


                {/* Search + Filter */}

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


                            {/* Search */}

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
    value={sort}
    onChange={(e) => {
        setSort(e.target.value)
        setPage(1)
    }}
    className="
        sm:w-[200px]
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
    <option value="newest">
        Newest First
    </option>

    <option value="oldest">
        Oldest First
    </option>

    <option value="priorityHigh">
        Priority: High → Low
    </option>

    <option value="priorityLow">
        Priority: Low → High
    </option>

    <option value="dueDateSoon">
        Due Date: Earliest
    </option>

    <option value="dueDateLate">
        Due Date: Latest
    </option>
</select>


                            {/* Status Filter */}

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


                {/* Loading */}

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


                    /* No tasks */

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


                    /* No matching tasks */

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


                    /* Task Cards */

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


                                {/* Title + Actions */}

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                ">


                                    <div className="min-w-0">

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


                                    <div className="
                                        flex
                                        gap-2
                                        shrink-0
                                    ">


                                        {/* Edit */}

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


                                        {/* Delete */}

                                        <button
                                            onClick={() =>
                                                setDeleteTaskId(
                                                    task._id
                                                )
                                            }
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


                                {/* Status + Priority */}

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


                                {/* Due Date */}

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


                {/* Pagination */}

                {!loading && totalPages > 1 && (

                    <div className="
                        mt-7
                        flex
                        items-center
                        justify-center
                        gap-4
                    ">

                        <button
                            onClick={() =>
                                setPage(prev => prev - 1)
                            }
                            disabled={!hasPreviousPage}
                            className="
                                px-4
                                py-2
                                rounded-md
                                border
                                border-[#DDE3EA]
                                bg-white
                                text-sm
                                font-semibold
                                text-[#374151]
                                hover:bg-[#F5F6FA]
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                            "
                        >
                            Previous
                        </button>


                        <span className="
                            text-sm
                            font-semibold
                            text-[#374151]
                        ">
                            Page {page} of {totalPages}
                        </span>


                        <button
                            onClick={() =>
                                setPage(prev => prev + 1)
                            }
                            disabled={!hasNextPage}
                            className="
                                px-4
                                py-2
                                rounded-md
                                bg-[#0D0B61]
                                text-white
                                text-sm
                                font-semibold
                                hover:bg-[#100d7a]
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                            "
                        >
                            Next
                        </button>

                    </div>

                )}


                {/* Create Task Modal */}

                {showCreateModal && (

                    <CreateTaskModal
                        onClose={() =>
                            setShowCreateModal(false)
                        }
                    />

                )}


                {/* Edit Task Modal */}

                {editTask && (

                    <CreateTaskModal
                        editTask={editTask}
                        onClose={() =>
                            setEditTask(null)
                        }
                    />

                )}

            </main>


            {/* Delete Confirmation Modal */}

            {deleteTaskId && (

                <DeleteConfirmModal

                    loading={
                        deleteLoading === deleteTaskId
                    }

                    onCancel={() =>
                        setDeleteTaskId(null)
                    }

                    onConfirm={async () => {

                        await handleDelete(
                            deleteTaskId
                        )

                        setDeleteTaskId(null)

                    }}

                />

            )}

        </div>
    )
}

export default Tasks