import { Bot, X } from "lucide-react";

export default function ChatHeader({ onClose }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-800 bg-[#111827] px-6 py-5">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-600 p-2 text-white">
                    <Bot size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">
                        CodeLens AI
                    </h2>

                    <p className="text-sm text-gray-400">
                        AI Programming Assistant
                    </p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
            >
                <X />
            </button>

        </div>
    );
}