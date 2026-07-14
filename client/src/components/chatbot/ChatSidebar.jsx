import { useState } from "react";
import { MessageSquarePlus, Trash2, MessageCircle } from "lucide-react";
import ConfirmModal from "../ConfirmCard";

export default function ChatSidebar({ chats = [], currentChat, onSelect, onDelete, onNewChat }) {
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        chatId: null,
    });

    const handleDelete = (e, chatId) => {
        e.stopPropagation();
        setDeleteModal({
            open: true,
            chatId,
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            open: false,
            chatId: null,
        });
    };

    const confirmDelete = () => {
        if (deleteModal.chatId) {
            onDelete(deleteModal.chatId);
        }
        closeDeleteModal();
    };

    return (
        <div className="flex w-80 flex-col border-r border-gray-800 bg-[#0B1120]">
            <div className="border-b border-gray-800 p-4">
                <button
                    onClick={onNewChat}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30"
                >
                    <MessageSquarePlus size={18} />
                    New Chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
                {chats.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center text-center text-gray-500">
                        <MessageCircle
                            size={55}
                            className="mb-4 opacity-50"
                        />
                        <h3 className="text-lg font-semibold text-gray-300">
                            No Chats Yet
                        </h3>
                        <p className="mt-2 text-sm">
                            Start a new conversation with
                            <br />
                            CodeLens AI.
                        </p>
                    </div>
                ) : (
                    chats.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => onSelect(chat._id)}
                            className={`group mb-2 flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-all duration-200
                            ${
                                currentChat === chat._id
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <div className="min-w-0 flex-1">
                                <p className="truncate font-medium">
                                    {chat.title || "New Chat"}
                                </p>
                            </div>

                            <button
                                onClick={(e) => handleDelete(e, chat._id)}
                                className="rounded-lg p-1 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/20"
                                title="Delete chat"
                            >
                                <Trash2
                                    size={16}
                                    className="text-red-400"
                                />
                            </button>

                        </div>
                    ))
                )}
            </div>

            <ConfirmModal
                open={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Chat"
                description="Delete this conversation permanently"
                message="Are you sure you want to delete this chat? This action cannot be undone."
                confirmText="Delete"
                icon="delete"
                danger={true}
            />
        </div>
    );
}