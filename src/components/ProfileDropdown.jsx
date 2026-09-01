import React from "react"
import {
    User,
    Settings,
    LogOut
} from "lucide-react"

function ProfileDropdown({ userData, onLogout, onProfile }) {

    return (
        <div className="absolute right-0 top-12 w-64 bg-white border border-[#DDE3EA] rounded-xl shadow-[0_10px_30px_rgba(15,23,42,0.12)] p-2 z-50">

            <div className="px-3 py-3 border-b border-[#E5E7EB] mb-1">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-[#0D0B61] text-white flex items-center justify-center font-bold text-lg">
                        {userData?.name
                            ?.charAt(0)
                            ?.toUpperCase()
                        }
                    </div>

                    <div className="min-w-0">

                        <p className="text-sm font-bold text-[#1F2937] truncate">
                            {userData?.name}
                        </p>

                        <p className="text-xs text-[#6B7280] truncate">
                            {userData?.email}
                        </p>

                    </div>

                </div>

            </div>

            {/* Profile */}
            <button
                onClick={onProfile}
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    text-[#1F2937]
                    hover:bg-[#F5F6FA]
                    transition
                "
            >
                <User size={17} />
                Profile
            </button>

            {/* Settings */}
            <button
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    text-[#1F2937]
                    hover:bg-[#F5F6FA]
                    transition
                "
            >
                <Settings size={17} />
                Settings
            </button>

            <div className="my-1 border-t border-[#E5E7EB]" />

            {/* Logout */}
            <button
                onClick={onLogout}
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    text-red-600
                    hover:bg-red-50
                    transition
                "
            >
                <LogOut size={17} />
                Logout
            </button>

        </div>
    )
}

export default ProfileDropdown