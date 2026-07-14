import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || loading) return;
    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-800 bg-[#111827] p-5">
      <div className="flex items-end gap-3">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask CodeLens AI anything..."
          className="max-h-40 min-h-[56px] flex-1 resize-none rounded-xl border border-gray-700 bg-[#1E293B] p-4 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all
            ${
              !message.trim() || loading
                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
            }
          `}
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Press <span className="font-semibold">Enter</span> to send •{" "}
        <span className="font-semibold">Shift + Enter</span> for a new line
      </p>
    </div>
  );
}