import React from "react"

function TaskEmptyState({
    filtered,
    onCreate,
    onClear
}) {

    if (filtered) {
        return (
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
                    onClick={onClear}
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
                    "
                >
                    Clear Filters
                </button>

            </div>
        )
    }

    return (
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
                onClick={onCreate}
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
                "
            >
                Create Task
            </button>

        </div>
    )
}

export default TaskEmptyState
