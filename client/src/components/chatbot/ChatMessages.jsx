import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#111827] px-8 py-6">
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/30">
            <Bot size={38} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Welcome to CodeLens AI
          </h1>

          <p className="mt-4 max-w-lg text-lg text-gray-400">
            Ask questions about programming, debug your code,
            learn algorithms, React, Node.js, C++, Java,
            databases, and much more.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-700 bg-[#1E293B] p-4 text-left">
              💡 Explain async/await
            </div>
            <div className="rounded-xl border border-gray-700 bg-[#1E293B] p-4 text-left">
              🐞 Find bugs in my code
            </div>
            <div className="rounded-xl border border-gray-700 bg-[#1E293B] p-4 text-left">
              ⚡ Optimize this algorithm
            </div>
            <div className="rounded-xl border border-gray-700 bg-[#1E293B] p-4 text-left">
              📚 Teach me React Hooks
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
            />
          ))}
          {loading && (
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <Bot size={18} className="text-white" />
              </div>
              <div className="rounded-2xl bg-[#1E293B] px-5 py-3 text-gray-300 shadow">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <span className="ml-2">
                    CodeLens AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}