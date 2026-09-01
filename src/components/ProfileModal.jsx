import React from "react"
import { X, Mail, User } from "lucide-react"

function ProfileModal({ userData, onClose }) {

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                bg-black/40
                flex
                items-center
                justify-center
                p-5
            "
            onClick={onClose}
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full
                    max-w-[500px]
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    overflow-hidden
                "
            >

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#DDE3EA]">

                    <div>
                        <h2 className="text-xl font-extrabold text-[#1F2937]">
                            My Profile
                        </h2>

                        <p className="text-xs text-[#6B7280] mt-1">
                            Your account information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-[#6B7280]
                            hover:bg-[#F5F6FA]
                        "
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Profile */}
                <div className="p-6">

                    <div className="flex flex-col items-center">

                        <div className="
                            w-24
                            h-24
                            rounded-full
                            bg-[#0D0B61]
                            text-white
                            flex
                            items-center
                            justify-center
                            text-3xl
                            font-extrabold
                        ">
                            {userData?.name
                                ?.charAt(0)
                                ?.toUpperCase()
                            }
                        </div>

                        <h3 className="text-xl font-bold text-[#1F2937] mt-4">
                            {userData?.name || "User"}
                        </h3>

                        <p className="text-sm text-[#6B7280] mt-1">
                            {userData?.email}
                        </p>

                    </div>

                    {/* Information */}
                    <div className="mt-7 space-y-3">

                        <div className="
                            flex
                            items-center
                            gap-4
                            p-4
                            rounded-xl
                            bg-[#F7F8FF]
                            border
                            border-[#DDE3EA]
                        ">

                            <div className="
                                w-10
                                h-10
                                rounded-lg
                                bg-white
                                border
                                border-[#DDE3EA]
                                flex
                                items-center
                                justify-center
                                text-[#0D0B61]
                            ">
                                <User size={18} />
                            </div>

                            <div>
                                <p className="text-xs text-[#6B7280]">
                                    Name
                                </p>

                                <p className="text-sm font-semibold text-[#1F2937] mt-0.5">
                                    {userData?.name || "Not available"}
                                </p>
                            </div>

                        </div>

                        <div className="
                            flex
                            items-center
                            gap-4
                            p-4
                            rounded-xl
                            bg-[#F7F8FF]
                            border
                            border-[#DDE3EA]
                        ">

                            <div className="
                                w-10
                                h-10
                                rounded-lg
                                bg-white
                                border
                                border-[#DDE3EA]
                                flex
                                items-center
                                justify-center
                                text-[#0D0B61]
                            ">
                                <Mail size={18} />
                            </div>

                            <div className="min-w-0">

                                <p className="text-xs text-[#6B7280]">
                                    Email
                                </p>

                                <p className="text-sm font-semibold text-[#1F2937] mt-0.5 truncate">
                                    {userData?.email || "Not available"}
                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            w-full
                            mt-6
                            px-5
                            py-2.5
                            rounded-lg
                            bg-[#0D0B61]
                            hover:bg-[#100d7a]
                            text-white
                            text-sm
                            font-bold
                            transition
                        "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ProfileModal