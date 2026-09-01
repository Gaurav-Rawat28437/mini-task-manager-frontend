import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

import Navbar from "../components/Navbar"
import CreateTaskModal from "../components/CreateTaskModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import TaskCard from "../components/TaskCard"
import TaskFilters from "../components/TaskFilters"
import TaskEmptyState from "../components/TaskEmptyState"
import TaskPagination from "../components/TaskPagination"

import {
    getTasksApi,
    deleteTaskApi
} from "../services/taskService"

import {
    setTasks,
    deleteTask
} from "../utils/taskSlice"

function Tasks() {

    const dispatch = useDispatch()

    const tasks = useSelector(
        store => store.Task?.data || []
    )

    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(null)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editTask, setEditTask] = useState(null)
    const [deleteTaskId, setDeleteTaskId] = useState(null)

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [sort, setSort] = useState("newest")

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPreviousPage, setHasPreviousPage] = useState(false)

    useEffect(() => {

        const getTasks = async () => {

            try {

                setLoading(true)

                const response =
                    await getTasksApi(page, 5, sort)

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

    }, [dispatch, page, sort])

    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title
                ?.toLowerCase()
                .includes(search.toLowerCase())

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

                dispatch(deleteTask(id))

                toast.success(response.message)

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

    return (
        <div className="min-h-dvh bg-[#F5F6FA]">

            <Navbar />

            <main className="
                p-5
                sm:p-8
                max-w-[1200px]
                mx-auto
            ">

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
                        "
                    >
                        + Create Task
                    </button>

                </div>

                {!loading && tasks.length > 0 && (
                    <TaskFilters
                        search={search}
                        setSearch={setSearch}
                        sort={sort}
                        setSort={setSort}
                        setPage={setPage}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />
                )}

                {loading && (
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
                        />

                        <p className="
                            text-sm
                            text-[#6B7280]
                            mt-4
                        ">
                            Loading tasks...
                        </p>

                    </div>
                )}

                {!loading && tasks.length === 0 && (
                    <TaskEmptyState
                        filtered={false}
                        onCreate={() =>
                            setShowCreateModal(true)
                        }
                    />
                )}

                {!loading &&
                    tasks.length > 0 &&
                    filteredTasks.length === 0 && (
                        <TaskEmptyState
                            filtered={true}
                            onClear={() => {
                                setSearch("")
                                setStatusFilter("All")
                            }}
                        />
                    )}

                {!loading &&
                    filteredTasks.length > 0 && (
                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-5
                        ">
                            {filteredTasks.map(task => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    onEdit={setEditTask}
                                    onDelete={setDeleteTaskId}
                                    deleteLoading={deleteLoading}
                                />
                            ))}
                        </div>
                    )}

                {!loading && (
                    <TaskPagination
                        page={page}
                        totalPages={totalPages}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                        setPage={setPage}
                    />
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
                    loading={
                        deleteLoading === deleteTaskId
                    }
                    onCancel={() =>
                        setDeleteTaskId(null)
                    }
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