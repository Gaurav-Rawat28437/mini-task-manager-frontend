import React from "react"
import { AlertTriangle, X } from "lucide-react"

function DeleteConfirmModal({
    onCancel,
    onConfirm,
    loading
}) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                onClick={onCancel}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">

               
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        absolute
                        top-4
                        right-4
                        w-8
                        h-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[#6B7280]
                        hover:bg-[#F3F4F6]
                        hover:text-[#1F2937]
                        transition
                        disabled:opacity-50
                    "
                >
                    <X size={18} />
                </button>

                
                <div className="p-6 sm:p-7">

                    <div className="flex items-start gap-4">

                        <div className="
                            w-12
                            h-12
                            shrink-0
                            rounded-full
                            bg-red-50
                            flex
                            items-center
                            justify-center
                        ">
                            <AlertTriangle
                                size={23}
                                className="text-red-600"
                            />
                        </div>

                        <div className="pr-6">

                            <h2 className="
                                text-lg
                                font-bold
                                text-[#1F2937]
                            ">
                                Delete Task
                            </h2>

                            <p className="
                                text-sm
                                text-[#6B7280]
                                mt-2
                                leading-6
                            ">
                                Are you sure you want to delete this task?
                                This action cannot be undone.
                            </p>

                        </div>

                    </div>

                </div>

                
                <div className="
                    px-6
                    py-4
                    bg-[#F9FAFB]
                    border-t
                    border-[#E5E7EB]
                    rounded-b-2xl
                    flex
                    justify-end
                    gap-3
                ">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            border-[#DDE3EA]
                            bg-white
                            text-sm
                            font-semibold
                            text-[#374151]
                            hover:bg-[#F3F4F6]
                            transition
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            text-sm
                            font-semibold
                            transition
                            disabled:opacity-50
                        "
                    >
                        {loading ? "Deleting..." : "Delete Task"}
                    </button>

                </div>

            </div>

        </div>
    )
}

export default DeleteConfirmModal