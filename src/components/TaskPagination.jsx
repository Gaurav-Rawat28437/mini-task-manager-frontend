import React from "react"

function TaskPagination({
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setPage
}) {

    if (totalPages <= 1) {
        return null
    }

    return (
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
    )
}

export default TaskPagination
