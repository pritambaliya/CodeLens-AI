import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ message }) {

    const isUser = message.role === "user";


    return (
        <div
            className={`mb-6 flex gap-4 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >

            {!isUser && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Bot size={20} className="text-white" />
                </div>
            )}


            <div
                className={`max-w-3xl rounded-2xl px-5 py-4 shadow-lg ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-[#1E293B] text-gray-200"
                }`}
            >

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{

                        // Heading
                        h3: ({ children }) => (
                            <h3 className="mb-4 mt-6 text-xl font-bold text-white">
                                {children}
                            </h3>
                        ),


                        h2: ({ children }) => (
                            <h2 className="mb-4 mt-6 text-2xl font-bold text-white">
                                {children}
                            </h2>
                        ),


                        // Paragraph
                        p: ({ children }) => (
                            <p className="mb-4 leading-7 text-gray-200">
                                {children}
                            </p>
                        ),


                        // Bold text
                        strong: ({ children }) => (
                            <strong className="font-bold text-white">
                                {children}
                            </strong>
                        ),


                        // Lists
                        ul: ({ children }) => (
                            <ul className="mb-4 ml-6 list-disc space-y-2">
                                {children}
                            </ul>
                        ),


                        li: ({ children }) => (
                            <li className="leading-7">
                                {children}
                            </li>
                        ),


                        // Code block
                        code: ({ inline, children }) =>
                            inline ? (
                                <code className="rounded bg-black/30 px-1.5 py-0.5 text-sm text-blue-300">
                                    {children}
                                </code>
                            ) : (
                                <pre className="my-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-sm">
                                    <code>
                                        {children}
                                    </code>
                                </pre>
                            ),

                    }}
                >
                    {message.content}
                </ReactMarkdown>

            </div>


            {isUser && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-700">
                    <User size={20} className="text-white" />
                </div>
            )}

        </div>
    );
}