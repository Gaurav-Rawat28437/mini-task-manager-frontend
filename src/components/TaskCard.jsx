import React from "react"

function TaskCard({
    task,
    onEdit,
    onDelete,
    deleteLoading
}) {

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
        <div className="
            bg-white
            rounded-xl
            border
            border-[#DDE3EA]
            p-5
            shadow-sm
        ">

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

                    <button
                        onClick={() => onEdit(task)}
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
                        onClick={() => onDelete(task._id)}
                        disabled={
                            deleteLoading === task._id
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
                        {deleteLoading === task._id
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

                <span className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${getStatusClass(task.status)}
                `}>
                    {task.status}
                </span>

                <span className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${getPriorityClass(task.priority)}
                `}>
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
    )
}

export default TaskCard