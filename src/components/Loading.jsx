import React from "react"

function Loading({ text = "Loading..." }) {
    return (
        <div className="min-h-dvh bg-[#F5F6FA] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">

                <div className="w-10 h-10 border-4 border-[#DDE3EA] border-t-[#0D0B61] rounded-full animate-spin"></div>

                <p className="text-sm font-medium text-[#6B7280]">
                    {text}
                </p>

            </div>
        </div>
    )
}

export default Loading