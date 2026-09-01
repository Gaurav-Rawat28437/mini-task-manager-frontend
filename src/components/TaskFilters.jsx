import React from "react"

function TaskFilters({
    search,
    setSearch,
    sort,
    setSort,
    setPage,
    statusFilter,
    setStatusFilter
}) {

    return (
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
                        setSearch(e.target.value)
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

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
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
    )
}

export default TaskFilters