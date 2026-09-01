import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
    LayoutDashboard,
    ListTodo,
    Plus
} from "lucide-react"

function Sidebar() {

    const navigate = useNavigate()
    const location = useLocation()

    const isDashboard = location.pathname === "/dashboard"
    const isTasks = location.pathname === "/tasks"

    return (
        <aside className="hidden md:flex fixed left-0 top-0 w-[240px] h-screen bg-[#0D0B61] text-white flex-col z-40">

            <div className="px-6 py-7 border-b border-white/[0.08]">

                <div className="text-2xl font-extrabold">
                    Task<span className="text-[#478B8D]">Flow</span>
                </div>

                <p className="text-xs text-white/50 mt-1">
                    Manage your work
                </p>

            </div>

            <nav className="flex-1 px-4 py-6">

                <p className="px-3 mb-3 text-[10px] uppercase tracking-wider font-bold text-white/40">
                    Workspace
                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        text-sm
                        font-semibold
                        text-left
                        transition
                        ${
                            isDashboard
                                ? "bg-white/[0.12] text-white"
                                : "text-white/65 hover:bg-white/[0.08] hover:text-white"
                        }
                    `}
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/tasks")}
                    className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        mt-2
                        rounded-lg
                        text-sm
                        font-semibold
                        text-left
                        transition
                        ${
                            isTasks
                                ? "bg-white/[0.12] text-white"
                                : "text-white/65 hover:bg-white/[0.08] hover:text-white"
                        }
                    `}
                >
                    <ListTodo size={18} />
                    Tasks
                </button>

                <button
                    onClick={() => navigate("/tasks")}
                    className="
                        w-full
                        mt-6
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-3
                        rounded-lg
                        bg-[#478B8D]
                        hover:bg-[#3d7b7d]
                        text-white
                        text-sm
                        font-bold
                        transition
                    "
                >
                    <Plus size={18} />
                    Create Task
                </button>

            </nav>

            <div className="px-5 py-5 border-t border-white/[0.08]">

                <p className="text-xs text-white/40">
                    TaskFlow
                </p>

                <p className="text-[11px] text-white/30 mt-1">
                    Stay organized. Get things done.
                </p>

            </div>

        </aside>
    )
}

export default Sidebar